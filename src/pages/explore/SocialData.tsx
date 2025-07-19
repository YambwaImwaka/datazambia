import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Building, Heart, MapPin } from "lucide-react";
import NonprofitDistribution from "@/components/visualizations/NonprofitDistribution";
import { nonprofitsByProvince } from "@/utils/data";

const SocialData = () => {
  const totalNGOs = nonprofitsByProvince.reduce((sum, province) => sum + province.value, 0);
  const topProvince = nonprofitsByProvince.reduce((prev, current) => 
    (prev.value > current.value) ? prev : current
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Heart className="h-8 w-8 text-primary" />
          Social Development
        </h1>
        <p className="text-muted-foreground">
          Civil society organizations and social development indicators in Zambia
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total NGOs Registered</CardDescription>
            <CardTitle className="text-2xl">{totalNGOs.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">2009-2024 period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Leading Province</CardDescription>
            <CardTitle className="text-2xl">{topProvince.region}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{topProvince.value} organizations</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Market Share</CardDescription>
            <CardTitle className="text-2xl">{topProvince.percentage.toFixed(1)}%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Lusaka dominance</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Provinces</CardDescription>
            <CardTitle className="text-2xl">9</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">All provinces covered</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="distribution" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="distribution" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Distribution
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Analysis
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="distribution" className="mt-6">
          <NonprofitDistribution />
        </TabsContent>

        <TabsContent value="analysis" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Concentration</CardTitle>
                <CardDescription>
                  Analysis of NGO distribution patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">Urban Concentration</h4>
                    <p className="text-sm text-muted-foreground">
                      Lusaka and Copperbelt provinces account for 80.4% of all registered NGOs, 
                      reflecting urban concentration of civil society organizations.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-secondary/10 rounded-lg">
                    <h4 className="font-semibold text-secondary mb-2">Rural Presence</h4>
                    <p className="text-sm text-muted-foreground">
                      Rural provinces (Northern, Northwestern, Muchinga, Luapula) have 
                      limited NGO presence, indicating potential service gaps.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-accent/10 rounded-lg">
                    <h4 className="font-semibold text-accent mb-2">Growth Opportunity</h4>
                    <p className="text-sm text-muted-foreground">
                      Eastern and Western provinces show moderate activity, 
                      suggesting potential for expansion of civil society engagement.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Provincial Rankings</CardTitle>
                <CardDescription>
                  NGO registration by province (2009-2024)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nonprofitsByProvince
                    .sort((a, b) => b.value - a.value)
                    .map((province, index) => (
                      <div key={province.region} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-yellow-500 text-white' :
                            index === 1 ? 'bg-gray-400 text-white' :
                            index === 2 ? 'bg-orange-500 text-white' :
                            'bg-gray-200 text-gray-600'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="font-medium">{province.region}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{province.value}</div>
                          <div className="text-xs text-muted-foreground">{province.percentage}%</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Insights & Implications</CardTitle>
                <CardDescription>
                  Understanding NGO distribution patterns in Zambia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-primary">Development Implications</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        Service delivery gaps in rural provinces may limit development impact
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        Capital city concentration provides efficiency but may reduce rural access
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        Need for incentives to encourage rural NGO establishment
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        Partnership opportunities between urban and rural organizations
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-secondary">Policy Considerations</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-secondary">•</span>
                        Decentralization of NGO services to underserved provinces
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary">•</span>
                        Capacity building programs for rural civil society
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary">•</span>
                        Regional coordination mechanisms for better coverage
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary">•</span>
                        Digital platforms to bridge urban-rural service gaps
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Focus Areas by Region</CardTitle>
                <CardDescription>
                  Typical NGO sectors by provincial characteristics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">Urban Centers (Lusaka, Copperbelt)</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Policy advocacy</li>
                      <li>• Human rights</li>
                      <li>• Urban development</li>
                      <li>• Business support</li>
                      <li>• Education & skills</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">Agricultural Regions (Central, Eastern)</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Rural development</li>
                      <li>• Agriculture support</li>
                      <li>• Food security</li>
                      <li>• Farmer cooperatives</li>
                      <li>• Water & sanitation</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-semibold mb-2">Remote Areas (Northern, Western)</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Healthcare delivery</li>
                      <li>• Education access</li>
                      <li>• Infrastructure</li>
                      <li>• Community development</li>
                      <li>• Emergency response</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialData;