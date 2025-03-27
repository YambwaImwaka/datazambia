import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResponsiveCard } from '@/components/ui/ResponsiveCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, CheckCheck, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';

interface Notification {
  id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const UserNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) {
          throw error;
        }

        setNotifications(data || []);
        const unread = data ? data.filter(n => !n.is_read).length : 0;
        setUnreadCount(unread);
      } catch (error: any) {
        console.error('Error fetching notifications:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    // Set up real-time subscription for new notifications
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setNotifications((prev) => [payload.new as Notification, ...prev]);
            setUnreadCount((prev) => prev + 1);
            toast.info(payload.new.title, {
              description: payload.new.message
            });
          } else if (payload.eventType === 'UPDATE') {
            setNotifications((prev) => 
              prev.map((notification) => 
                notification.id === payload.new.id ? (payload.new as Notification) : notification
              )
            );
            recalculateUnreadCount();
          } else if (payload.eventType === 'DELETE') {
            setNotifications((prev) => 
              prev.filter((notification) => notification.id !== payload.old.id)
            );
            recalculateUnreadCount();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const recalculateUnreadCount = () => {
    const unread = notifications.filter(n => !n.is_read).length;
    setUnreadCount(unread);
  };

  const markAsRead = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id ? { ...notification, is_read: true } : notification
        )
      );

      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error: any) {
      console.error('Error marking notification as read:', error.message);
    }
  };

  const markAllAsRead = async () => {
    if (!user || notifications.filter(n => !n.is_read).length === 0) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false);

      if (error) {
        throw error;
      }

      setNotifications(prev => 
        prev.map(notification => ({ ...notification, is_read: true }))
      );

      setUnreadCount(0);
      toast.success('All notifications marked as read');
    } catch (error: any) {
      console.error('Error marking all notifications as read:', error.message);
      toast.error('Failed to mark notifications as read');
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-5 h-5 flex items-center justify-center">
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="pb-4 border-b">
          <div className="flex justify-between items-center">
            <SheetTitle>Notifications</SheetTitle>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center text-xs h-8"
                onClick={markAllAsRead}
              >
                <CheckCheck className="h-3.5 w-3.5 mr-1" />
                Mark all as read
              </Button>
            )}
          </div>
        </SheetHeader>
        <div className="mt-4">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No notifications yet</p>
            </div>
          ) : (
            <ScrollArea className="h-[calc(100vh-120px)]">
              <div className="space-y-3 py-2 pr-3">
                {notifications.map((notification) => (
                  <ResponsiveCard 
                    key={notification.id}
                    className={`cursor-pointer transition-colors ${notification.is_read ? 'bg-muted/20' : 'bg-card border-l-4 border-l-primary'}`}
                    onClick={() => !notification.is_read && markAsRead(notification.id)}
                  >
                    <CardContent className="p-3 space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className={`text-sm font-medium ${!notification.is_read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notification.title}
                        </h3>
                        <div className="text-xs text-muted-foreground">
                          {new Date(notification.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                    </CardContent>
                  </ResponsiveCard>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserNotifications;
