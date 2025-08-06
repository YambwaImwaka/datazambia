import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { provincialGovernment } from '@/data/governmentData';
import { Users, MapPin, Building, Phone, Mail, Crown } from 'lucide-react';

interface DistrictDetailsProps {
  provinceId: string;
  districtName?: string;
}

export const DistrictDetails: React.FC<DistrictDetailsProps> = ({ provinceId, districtName }) => {
  const provinceData = provincialGovernment[provinceId as keyof typeof provincialGovernment];
  
  if (!provinceData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">District information not available for this province.</p>
      </div>
    );
  }

  const district = districtName 
    ? provinceData.districts.find(d => d.name.toLowerCase() === districtName.toLowerCase())
    : null;

  if (districtName && !district) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">District "{districtName}" not found in {provinceData.name}.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Province Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Crown className="w-5 h-5 mr-2" />
            {provinceData.name} - Provincial Government
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Provincial Minister</h3>
              <div className="space-y-2">
                <p className="font-medium">{provinceData.provincialMinister.name}</p>
                <Badge variant="secondary">{provinceData.provincialMinister.party}</Badge>
                <p className="text-sm text-gray-600">
                  Appointed: {new Date(provinceData.provincialMinister.appointmentDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Permanent Secretary</h3>
              <div className="space-y-2">
                <p className="font-medium">{provinceData.permanentSecretary.name}</p>
                <p className="text-sm text-gray-600">
                  Appointed: {new Date(provinceData.permanentSecretary.appointmentDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Districts Overview or Specific District */}
      {district ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="w-5 h-5 mr-2" />
              {district.name} District
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Population</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {district.population.toLocaleString()}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Building className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Leadership</span>
                </div>
                <div className="space-y-1">
                  {district.mayor && <p className="text-sm"><strong>Mayor:</strong> {district.mayor}</p>}
                  {'councilChairperson' in district && <p className="text-sm"><strong>Council Chair:</strong> {district.councilChairperson}</p>}
                  {'townClerk' in district && <p className="text-sm"><strong>Town Clerk:</strong> {district.townClerk}</p>}
                  {'councilSecretary' in district && <p className="text-sm"><strong>Council Secretary:</strong> {district.councilSecretary}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Constituencies</span>
                </div>
                <div className="space-y-1">
                  {district.constituencies.map((constituency, index) => (
                    <Badge key={index} variant="outline" className="mr-1 mb-1">
                      {constituency}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">District Services</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>• Civil Registration</div>
                <div>• Local Courts</div>
                <div>• District Health Office</div>
                <div>• Education Office</div>
                <div>• Agriculture Office</div>
                <div>• Social Welfare</div>
                <div>• Water & Sanitation</div>
                <div>• Roads & Infrastructure</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {provinceData.districts.map((dist, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{dist.name} District</span>
                  <Badge variant="outline">{dist.constituencies.length} constituencies</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Population</span>
                  <span className="font-bold text-blue-600">
                    {dist.population.toLocaleString()}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Leadership</h4>
                  {dist.mayor && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Mayor</span>
                      <span>{dist.mayor}</span>
                    </div>
                  )}
                  {'councilChairperson' in dist && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Council Chair</span>
                      <span>{dist.councilChairperson}</span>
                    </div>
                  )}
                  {'townClerk' in dist && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Town Clerk</span>
                      <span>{dist.townClerk}</span>
                    </div>
                  )}
                  {'councilSecretary' in dist && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Council Secretary</span>
                      <span>{dist.councilSecretary}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Constituencies</h4>
                  <div className="flex flex-wrap gap-1">
                    {dist.constituencies.map((constituency, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {constituency}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = `/province/${provinceId}/${dist.name.toLowerCase()}`}
                >
                  View District Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};