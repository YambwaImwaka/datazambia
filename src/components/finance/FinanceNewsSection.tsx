
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchFinanceNews } from '@/services/news/FinanceNewsService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Clock, Tag, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

interface FinanceNewsSectionProps {
  isVisible: boolean;
}

const FinanceNewsSection: React.FC<FinanceNewsSectionProps> = ({ isVisible }) => {
  const { data: news, isLoading, error } = useQuery({
    queryKey: ['financeNews'],
    queryFn: () => fetchFinanceNews(3),
    enabled: isVisible,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col md:flex-row gap-4">
            <Skeleton className="h-24 w-full md:w-1/4 rounded-md" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-6">
        <p className="text-red-500">Error loading finance news</p>
      </div>
    );
  }
  
  if (!news || news.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">No news articles available at this time</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {news.map((article) => (
        <div key={article.id} className="flex flex-col md:flex-row gap-4 pb-4 border-b last:border-b-0">
          {article.imageUrl && (
            <div className="md:w-1/4">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-24 md:h-full object-cover rounded-md" 
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{article.title}</h3>
            <p className="text-muted-foreground text-sm my-2">{article.summary}</p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
              </span>
              <span>•</span>
              <span>{article.source}</span>
              <span>•</span>
              <Badge variant="outline" className="capitalize text-xs">
                {article.category}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {article.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-2">
              <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  Read full article
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      ))}
      
      <div className="flex justify-end pt-2">
        <Button variant="outline" size="sm">
          View All Finance News
        </Button>
      </div>
    </div>
  );
};

export default FinanceNewsSection;
