import { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Mountain, 
  Wallet, 
  Cloud, 
  Building2,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Droplets,
  Trees,
  Factory,
  Users,
  DollarSign,
  Award,
  FileText
} from 'lucide-react';
import { fetchMiningData, type ComprehensiveMiningData } from '@/services/mining/MiningResourcesService';
import { fetchFinancialInclusionData, type FinancialInclusionData } from '@/services/finance/FinancialInclusionService';
import { fetchEnvironmentData, type EnvironmentClimateData } from '@/services/environment/EnvironmentClimateService';
import { fetchGovernanceData, type GovernanceData } from '@/services/governance/GovernanceService';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';

const ComprehensiveInsights = () => {
  const [miningData, setMiningData] = useState<ComprehensiveMiningData | null>(null);
  const [financialData, setFinancialData] = useState<FinancialInclusionData | null>(null);
  const [environmentData, setEnvironmentData] = useState<EnvironmentClimateData | null>(null);
  const [governanceData, setGovernanceData] = useState<GovernanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [mining, financial, environment, governance] = await Promise.all([
          fetchMiningData(),
          fetchFinancialInclusionData(),
          fetchEnvironmentData(),
          fetchGovernanceData()
        ]);
        
        setMiningData(mining);
        setFinancialData(financial);
        setEnvironmentData(environment);
        setGovernanceData(governance);
      } catch (error) {
        console.error('Error loading comprehensive data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading comprehensive insights...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Comprehensive National Insights</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            In-depth analysis of Zambia's mining, financial inclusion, environment, and governance sectors
          </p>
        </div>

        <Tabs defaultValue="mining" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mining" className="flex items-center gap-2">
              <Mountain className="h-4 w-4" />
              Mining & Resources
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Financial Inclusion
            </TabsTrigger>
            <TabsTrigger value="environment" className="flex items-center gap-2">
              <Cloud className="h-4 w-4" />
              Environment & Climate
            </TabsTrigger>
            <TabsTrigger value="governance" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Governance
            </TabsTrigger>
          </TabsList>

          {/* Mining Tab */}
          <TabsContent value="mining" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    2024 Copper Production
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{miningData?.production[0].copper.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">metric tons (+12% YoY)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-blue-500" />
                    GDP Contribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{miningData?.economicImpact.gdpContribution}%</div>
                  <p className="text-sm text-muted-foreground">of national GDP</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-500" />
                    Mining Employment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{miningData?.economicImpact.employmentTotal.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">total jobs (direct & indirect)</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Copper Production Trend</CardTitle>
                <CardDescription>Annual production in metric tons</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={miningData?.production.filter(p => !p.quarter).reverse() || []}
                  xAxisKey="year"
                  lines={[{ dataKey: 'copper', name: 'Copper', color: '#f97316' }]}
                  height={300}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Major Mining Companies</CardTitle>
                <CardDescription>Top producers by output</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {miningData?.majorCompanies.map((company, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{company.name}</h3>
                        <p className="text-sm text-muted-foreground">{company.location}</p>
                        <Badge variant="secondary" className="mt-1">{company.mainCommodity}</Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{company.production.toLocaleString()}</div>
                        <p className="text-sm text-muted-foreground">MT/year</p>
                        <p className="text-xs text-muted-foreground">{company.employees.toLocaleString()} employees</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Water Usage</p>
                  <p className="text-xl font-bold">{miningData?.environmentalImpact.waterUsage}M m³</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Land Disturbed</p>
                  <p className="text-xl font-bold">{miningData?.environmentalImpact.landDisturbed.toLocaleString()} ha</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CO₂ Emissions</p>
                  <p className="text-xl font-bold">{(miningData?.environmentalImpact.carbonEmissions! / 1000000).toFixed(2)}M MT</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Land Rehabilitated</p>
                  <p className="text-xl font-bold">{miningData?.environmentalImpact.rehabilitatedLand.toLocaleString()} ha</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Inclusion Tab */}
          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{financialData?.accessMetrics[0].totalFinancialAccess}%</div>
                  <p className="text-sm text-muted-foreground">adults with bank/mobile money</p>
                  <Badge variant="outline" className="mt-2">
                    +{(financialData?.accessMetrics[0].totalFinancialAccess! - financialData?.accessMetrics[4].totalFinancialAccess!).toFixed(1)}% since 2020
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mobile Money Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{financialData?.accessMetrics[0].adultsWithMobileMoneyAccount}%</div>
                  <p className="text-sm text-muted-foreground">of adult population</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {financialData?.accessMetrics[0].registeredMobileMoneyAccounts}M registered accounts
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SME Credit Gap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">${financialData?.smeFinance.creditGap}M</div>
                  <p className="text-sm text-muted-foreground">unmet financing needs</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Only {financialData?.smeFinance.smesWithCredit}% of SMEs have credit access
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Financial Inclusion Growth</CardTitle>
                <CardDescription>Percentage of adults with access (2020-2024)</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={financialData?.accessMetrics.reverse() || []}
                  xAxisKey="year"
                  lines={[
                    { dataKey: 'totalFinancialAccess', name: 'Total Access', color: '#3b82f6' },
                    { dataKey: 'adultsWithMobileMoneyAccount', name: 'Mobile Money', color: '#10b981' },
                    { dataKey: 'adultsWithBankAccount', name: 'Bank Account', color: '#f59e0b' }
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>SME Finance by Gender</CardTitle>
                  <CardDescription>Credit access disparity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Men-owned SMEs</span>
                        <span className="font-bold">{financialData?.smeFinance.menOwnedSMEsWithCredit}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div 
                          className="bg-blue-500 h-3 rounded-full" 
                          style={{ width: `${financialData?.smeFinance.menOwnedSMEsWithCredit}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Women-owned SMEs</span>
                        <span className="font-bold">{financialData?.smeFinance.womenOwnedSMEsWithCredit}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div 
                          className="bg-pink-500 h-3 rounded-full" 
                          style={{ width: `${financialData?.smeFinance.womenOwnedSMEsWithCredit}%` }}
                        />
                      </div>
                    </div>
                    <Badge variant="destructive" className="mt-2">
                      {(financialData?.smeFinance.menOwnedSMEsWithCredit! - financialData?.smeFinance.womenOwnedSMEsWithCredit!).toFixed(1)}% gender gap
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Digital Economy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Internet Penetration</span>
                    <span className="font-bold">{financialData?.digitalEconomy.internetPenetration}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mobile Subscription</span>
                    <span className="font-bold">{financialData?.digitalEconomy.mobileSubscription}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Smartphone Users</span>
                    <span className="font-bold">{financialData?.digitalEconomy.smartphoneUsers}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>E-Commerce Growth</span>
                    <span className="font-bold text-green-600">+{financialData?.digitalEconomy.eCommerceGrowth}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fintech Startups</span>
                    <span className="font-bold">{financialData?.fintech.fintechStartups}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Environment Tab */}
          <TabsContent value="environment" className="space-y-6">
            <Card className="border-red-500/50 bg-red-50 dark:bg-red-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  2024 Drought Crisis
                </CardTitle>
                <CardDescription>Worst drought in 20 years</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Rainfall Deficit</p>
                  <p className="text-2xl font-bold text-red-600">{environmentData?.rainfall[0].deviation}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Affected Population</p>
                  <p className="text-2xl font-bold">{environmentData?.droughtFloodEvents[0].affectedPopulation}M</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Crop Losses</p>
                  <p className="text-2xl font-bold">{environmentData?.droughtFloodEvents[0].cropLosses}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Economic Loss</p>
                  <p className="text-2xl font-bold">${environmentData?.droughtFloodEvents[0].economicLoss}M</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  Rainfall Trend
                </CardTitle>
                <CardDescription>Annual rainfall vs normal (mm)</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={environmentData?.rainfall.reverse() || []}
                  xAxisKey="year"
                  lines={[
                    { dataKey: 'annualRainfall', name: 'Actual', color: '#3b82f6' },
                    { dataKey: 'normalRainfall', name: 'Normal', color: '#94a3b8', strokeDasharray: '5 5' }
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trees className="h-5 w-5 text-green-600" />
                    Forest Cover
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">{environmentData?.forestCover[0].forestArea.toLocaleString()} ha</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Deforestation Rate</span>
                      <span className="text-red-600 font-semibold">-{environmentData?.forestCover[0].deforestationRate}% /year</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Reforestation (2024)</span>
                      <span className="text-green-600 font-semibold">+{environmentData?.forestCover[0].reforestationArea.toLocaleString()} ha</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    Water Availability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Kariba Dam Level</p>
                      <div className="text-3xl font-bold text-red-600">{environmentData?.waterAvailability[0].karibaDamLevel}%</div>
                      <Badge variant="destructive" className="mt-2">Critical - Historic Low</Badge>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Surface Water</span>
                        <span className="font-semibold">{environmentData?.waterAvailability[0].surfaceWater} BCM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Groundwater</span>
                        <span className="font-semibold">{environmentData?.waterAvailability[0].groundwater} BCM</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Climate Change Indicators</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Temp. Increase</p>
                  <p className="text-2xl font-bold">+{environmentData?.climateIndicators.avgTemperatureIncrease}°C</p>
                  <p className="text-xs text-muted-foreground">since 1990</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Extreme Events</p>
                  <p className="text-2xl font-bold">{environmentData?.climateIndicators.extremeWeatherEvents}</p>
                  <p className="text-xs text-muted-foreground">per decade</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CO₂ Emissions</p>
                  <p className="text-2xl font-bold">{environmentData?.climateIndicators.carbonEmissions}M MT</p>
                  <p className="text-xs text-muted-foreground">annually</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Renewable Energy</p>
                  <p className="text-2xl font-bold">{environmentData?.climateIndicators.renewableEnergyShare}%</p>
                  <p className="text-xs text-muted-foreground">mostly hydro</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Governance Tab */}
          <TabsContent value="governance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Corruption Index 2024</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{governanceData?.corruption[0].cpiScore}/100</div>
                  <p className="text-sm text-muted-foreground">Rank: {governanceData?.corruption[0].cpiRank}/{governanceData?.corruption[0].totalCountries}</p>
                  <Badge variant="secondary" className="mt-2">{governanceData?.corruption[0].perception}</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ease of Doing Business</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">85th</div>
                  <p className="text-sm text-muted-foreground">out of 190 countries (2019)</p>
                  <p className="text-xs text-muted-foreground mt-2">Score: {governanceData?.easeOfBusiness[0].score}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>R&D Investment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{governanceData?.innovation[0].rdSpending}%</div>
                  <p className="text-sm text-muted-foreground">of GDP</p>
                  <p className="text-xs text-muted-foreground mt-2">${governanceData?.innovation[0].rdExpenditure}M annually</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Corruption Trend</CardTitle>
                <CardDescription>CPI Score (higher is better)</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={governanceData?.corruption.reverse() || []}
                  xAxisKey="year"
                  lines={[{ dataKey: 'cpiScore', name: 'CPI Score', color: '#ef4444' }]}
                  height={300}
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Governance Indicators</CardTitle>
                  <CardDescription>World Bank scores (-2.5 to 2.5)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Political Stability</span>
                    <span className={governanceData?.policyStability[0].politicalStabilityIndex! > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                      {governanceData?.policyStability[0].politicalStabilityIndex}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Govt. Effectiveness</span>
                    <span className="text-red-600 font-bold">{governanceData?.policyStability[0].governmentEffectiveness}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Regulatory Quality</span>
                    <span className="text-red-600 font-bold">{governanceData?.policyStability[0].regulatoryQuality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rule of Law</span>
                    <span className="text-red-600 font-bold">{governanceData?.policyStability[0].ruleOfLaw}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Control of Corruption</span>
                    <span className="text-red-600 font-bold">{governanceData?.policyStability[0].controlOfCorruption}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Innovation Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Patents Filed (2024)</span>
                    <span className="font-bold">{governanceData?.innovation[0].patents.filed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Patents Granted</span>
                    <span className="font-bold">{governanceData?.innovation[0].patents.granted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Researchers</span>
                    <span className="font-bold">{governanceData?.innovation[0].researchers} /million</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tech Startups</span>
                    <span className="font-bold">{governanceData?.innovation[0].techStartups}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Research Centers</span>
                    <span className="font-bold">{governanceData?.innovation[0].universityResearchCenters}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Public Spending Breakdown (2024)</CardTitle>
                <CardDescription>Budget allocation by sector</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(governanceData?.publicSpending[0].breakdown || {}).map(([sector, percentage]) => (
                    <div key={sector}>
                      <div className="flex justify-between mb-1">
                        <span className="capitalize">{sector.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-bold">{percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ComprehensiveInsights;
