
import { useState, useEffect, useMemo } from "react";
import { 
  useHealthIndicatorsData,
  useDiseasePrevalenceData,
  useHealthcareAccessData,
  useImmunizationRatesData,
  useMaternalHealthData
} from "@/services/HealthService";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Activity, 
  Heart, 
  Stethoscope, 
  Syringe, 
  Baby,
  TrendingUp, 
  TrendingDown,
  Search,
  Info,
  AlertCircle
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip } from "@/components/ui/tooltip";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DataCard } from "@/components/ui/DataCard";

export const HealthDashboard = () => {
  const { data: healthIndicators, loading: loadingIndicators } = useHealthIndicatorsData();
  const { data: diseaseData, loading: loadingDiseases } = useDiseasePrevalenceData();
  const { data: healthcareData, loading: loadingHealthcare } = useHealthcareAccessData();
  const { data: immunizationData, loading: loadingImmunization } = useImmunizationRatesData();
  const { data: maternalData, loading: loadingMaternal } = useMaternalHealthData();
  const [activeTab, setActiveTab] = useState("health-indicators");
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  useEffect(() => {
    // Delay visibility for smoother rendering
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter healthcare data by province
  const filteredHealthcareData = useMemo(() => 
    healthcareData?.filter(item => 
      (selectedProvince === "all" || item.province === selectedProvince) &&
      (searchTerm === "" || item.province.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [healthcareData, selectedProvince, searchTerm]);
  
  // Filter maternal health data by province
  const filteredMaternalData = useMemo(() => 
    maternalData?.filter(item => 
      (selectedProvince === "all" || item.province === selectedProvince) &&
      (searchTerm === "" || item.province.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [maternalData, selectedProvince, searchTerm]);
  
  // Filter immunization data by province and vaccine type
  const filteredImmunizationData = useMemo(() => 
    immunizationData?.filter(item => 
      (selectedProvince === "all" || item.province === selectedProvince) &&
      (searchTerm === "" || 
        item.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.vaccine.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [immunizationData, selectedProvince, searchTerm]);
  
  // Filter disease data by disease name
  const filteredDiseaseData = useMemo(() => 
    diseaseData?.filter(item => 
      searchTerm === "" || 
      item.disease.toLowerCase().includes(searchTerm.toLowerCase())
    ), [diseaseData, searchTerm]);
  
  // Prepare data for maternal health chart
  const getMaternalHealthChartData = useMemo(() => {
    if (!filteredMaternalData) return [];
    
    return filteredMaternalData.map(item => ({
      province: item.province,
      mmr: item.maternalMortalityRatio,
      skilledBirth: item.percentSkilledBirthAttendance,
      antenatalCare: item.percentAntenatalCare,
      institutionalDelivery: item.percentInstitutionalDelivery
    }));
  }, [filteredMaternalData]);
  
  // Prepare data for disease prevalence chart
  const getDiseaseChartData = useMemo(() => {
    if (!filteredDiseaseData) return [];
    
    return filteredDiseaseData.map(item => ({
      name: item.disease,
      prevalence: item.prevalenceRate,
      mortality: item.mortalityRate
    }));
  }, [filteredDiseaseData]);

  return (
    <div 
      className="w-full py-8"
      style={{ 
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.8s ease-out"
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Health Statistics Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Comprehensive health indicators and statistics across Zambia
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-9 w-full sm:w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={selectedProvince} onValueChange={setSelectedProvince}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Province" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Provinces</SelectItem>
              {healthcareData?.map(item => (
                <SelectItem key={item.province} value={item.province}>
                  {item.province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="health-indicators" onValueChange={setActiveTab}>
        <TabsList className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-5'} mb-8`}>
          <TabsTrigger value="health-indicators" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span className={isMobile ? 'text-xs' : ''}>Health Indicators</span>
          </TabsTrigger>
          <TabsTrigger value="disease-prevalence" className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4" />
            <span className={isMobile ? 'text-xs' : ''}>Disease Prevalence</span>
          </TabsTrigger>
          <TabsTrigger value="healthcare-access" className="flex items-center space-x-2">
            <Stethoscope className="h-4 w-4" />
            <span className={isMobile ? 'text-xs' : ''}>Healthcare Access</span>
          </TabsTrigger>
          <TabsTrigger value="immunization" className="flex items-center space-x-2">
            <Syringe className="h-4 w-4" />
            <span className={isMobile ? 'text-xs' : ''}>Immunization</span>
          </TabsTrigger>
          <TabsTrigger value="maternal-health" className="flex items-center space-x-2">
            <Baby className="h-4 w-4" />
            <span className={isMobile ? 'text-xs' : ''}>Maternal Health</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="health-indicators" className="mt-0">
          {loadingIndicators ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-40 w-full rounded-lg" />
              ))}
            </div>
          ) : healthIndicators?.length ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.6s ease-out" }}
            >
              {healthIndicators.map((indicator, index) => (
                <DataCard
                  key={indicator.id}
                  title={indicator.name}
                  value={indicator.value + " " + indicator.unit}
                  change={indicator.changePercentage ? `${Math.abs(indicator.changePercentage).toFixed(1)}% from previous year` : undefined}
                  isPositive={indicator.trend === "increasing" ? true : false}
                  description={`Source: ${indicator.source} (${indicator.year})`}
                  index={index}
                  icon={<Heart className="h-4 w-4" />}
                />
              ))}
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400">
                No health indicators data available for the selected filters
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="disease-prevalence" className="mt-0">
          {loadingDiseases ? (
            <div className="space-y-8">
              <Card className="p-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <Skeleton className="h-80 w-full" />
              </Card>
              
              <Card className="p-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <div className="overflow-x-auto">
                  <Skeleton className="h-64 w-full" />
                </div>
              </Card>
            </div>
          ) : filteredDiseaseData?.length ? (
            <div className="space-y-8" style={{ opacity: 0, animation: isVisible ? "fade-in 0.6s ease-out forwards" : "none" }}>
              <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Major Disease Burden in Zambia
                </h3>
                <div className="h-80">
                  <BarChart
                    data={getDiseaseChartData}
                    categories={[
                      { name: "Prevalence Rate", key: "prevalence", color: "#ef4444" },
                      { name: "Mortality Rate", key: "mortality", color: "#6366f1" }
                    ]}
                    index="name"
                    height={300}
                    yAxisLabel="per 100,000 population"
                  />
                </div>
              </Card>
              
              <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Disease Prevalence and Trends
                </h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>
                      Disease data for Zambia (Latest available data)
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Disease</TableHead>
                        <TableHead>Prevalence Rate (per 100,000)</TableHead>
                        <TableHead>Mortality Rate (per 100,000)</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>YoY Change</TableHead>
                        <TableHead>Source</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDiseaseData.map((disease, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              {disease.disease}
                              {disease.disease === "HIV/AIDS" || disease.disease === "Malaria" || disease.disease === "Tuberculosis" ? (
                                <Badge className="ml-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                                  Priority
                                </Badge>
                              ) : null}
                            </div>
                          </TableCell>
                          <TableCell>{disease.prevalenceRate.toFixed(1)}</TableCell>
                          <TableCell>{disease.mortalityRate.toFixed(1)}</TableCell>
                          <TableCell>{disease.yearReported}</TableCell>
                          <TableCell>
                            <div className={`flex items-center ${disease.changeFromPreviousYear < 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {disease.changeFromPreviousYear < 0 ? 
                                <TrendingDown className="h-4 w-4 mr-1" /> : 
                                <TrendingUp className="h-4 w-4 mr-1" />
                              }
                              <span>{Math.abs(disease.changeFromPreviousYear).toFixed(1)}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{disease.source}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400">
                No disease data available for the selected filters
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="healthcare-access" className="mt-0">
          {loadingHealthcare ? (
            <Card className="p-6">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="overflow-x-auto">
                <Skeleton className="h-64 w-full" />
              </div>
            </Card>
          ) : filteredHealthcareData?.length ? (
            <Card 
              className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md"
              style={{ opacity: 0, animation: isVisible ? "fade-in 0.6s ease-out forwards" : "none" }}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Healthcare Infrastructure and Access by Province
              </h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>
                    Healthcare access data for Zambia's provinces (2023)
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Province</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Health Facilities
                          <Tooltip content="Number of health facilities including hospitals, health centers, and clinics">
                            <Info className="h-4 w-4 ml-1 text-gray-400" />
                          </Tooltip>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Population per Doctor
                          <Tooltip content="Number of people served by one doctor - lower is better">
                            <Info className="h-4 w-4 ml-1 text-gray-400" />
                          </Tooltip>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Population per Nurse
                          <Tooltip content="Number of people served by one nurse - lower is better">
                            <Info className="h-4 w-4 ml-1 text-gray-400" />
                          </Tooltip>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          % Access
                          <Tooltip content="Percentage of population within one hour of a health facility">
                            <Info className="h-4 w-4 ml-1 text-gray-400" />
                          </Tooltip>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          % Insured
                          <Tooltip content="Percentage of population with health insurance">
                            <Info className="h-4 w-4 ml-1 text-gray-400" />
                          </Tooltip>
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHealthcareData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.province}</TableCell>
                        <TableCell>{item.healthFacilities}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{item.populationPerDoctor.toLocaleString()}</span>
                            <div className="mt-1">
                              <Progress 
                                value={Math.min(100, (20000 - item.populationPerDoctor) / 200)} 
                                className="h-2"
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{item.populationPerNurse.toLocaleString()}</span>
                            <div className="mt-1">
                              <Progress 
                                value={Math.min(100, (4000 - item.populationPerNurse) / 40)} 
                                className="h-2"
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{item.percentWithinOneHourOfFacility.toFixed(1)}%</span>
                            <div className="mt-1">
                              <Progress 
                                value={item.percentWithinOneHourOfFacility} 
                                className="h-2"
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{item.percentWithHealthInsurance.toFixed(1)}%</span>
                            <div className="mt-1">
                              <Progress 
                                value={item.percentWithHealthInsurance} 
                                className="h-2"
                              />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          ) : (
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400">
                No healthcare access data available for the selected filters
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="immunization" className="mt-0">
          {loadingImmunization ? (
            <Card className="p-6">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="overflow-x-auto">
                <Skeleton className="h-64 w-full" />
              </div>
            </Card>
          ) : filteredImmunizationData?.length ? (
            <Card 
              className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md"
              style={{ opacity: 0, animation: isVisible ? "fade-in 0.6s ease-out forwards" : "none" }}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Immunization Coverage by Province and Vaccine Type
              </h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>
                    Immunization coverage data for Zambia (2023)
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Province</TableHead>
                      <TableHead>Vaccine</TableHead>
                      <TableHead>Coverage (%)</TableHead>
                      <TableHead>Target (%)</TableHead>
                      <TableHead>Progress to Target</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead>Source</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredImmunizationData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.province}</TableCell>
                        <TableCell>{item.vaccine}</TableCell>
                        <TableCell>{item.coveragePercentage.toFixed(1)}%</TableCell>
                        <TableCell>{item.targetPercentage}%</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="mt-1 flex items-center space-x-2">
                              <Progress 
                                value={(item.coveragePercentage / item.targetPercentage) * 100} 
                                className="h-2 w-24"
                              />
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {((item.coveragePercentage / item.targetPercentage) * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={`flex items-center ${
                            item.trend === "increasing" ? 'text-green-600' : 
                            item.trend === "decreasing" ? 'text-red-600' : 
                            'text-yellow-600'
                          }`}>
                            {item.trend === "increasing" ? <TrendingUp className="h-4 w-4" /> : 
                             item.trend === "decreasing" ? <TrendingDown className="h-4 w-4" /> : 
                             "→"}
                            <span className="ml-1 capitalize">{item.trend}</span>
                          </div>
                        </TableCell>
                        <TableCell>{item.source}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          ) : (
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400">
                No immunization data available for the selected filters
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="maternal-health" className="mt-0">
          {loadingMaternal ? (
            <div className="space-y-8">
              <Card className="p-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <Skeleton className="h-80 w-full" />
              </Card>
              
              <Card className="p-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <div className="overflow-x-auto">
                  <Skeleton className="h-64 w-full" />
                </div>
              </Card>
            </div>
          ) : filteredMaternalData?.length ? (
            <div className="space-y-8" style={{ opacity: 0, animation: isVisible ? "fade-in 0.6s ease-out forwards" : "none" }}>
              <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Maternal Health Service Utilization by Province
                </h3>
                <div className="h-80">
                  <LineChart
                    data={getMaternalHealthChartData}
                    lines={[
                      { dataKey: "skilledBirth", name: "Skilled Birth Attendance (%)", color: "#0ea5e9" },
                      { dataKey: "antenatalCare", name: "Antenatal Care (%)", color: "#8b5cf6" },
                      { dataKey: "institutionalDelivery", name: "Institutional Delivery (%)", color: "#10b981" }
                    ]}
                    xAxisKey="province"
                    height={300}
                  />
                </div>
              </Card>
              
              <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Maternal Mortality and Healthcare Indicators
                </h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>
                      Maternal health data across Zambia's provinces (2023)
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Province</TableHead>
                        <TableHead>
                          <div className="flex items-center">
                            Maternal Mortality Ratio
                            <Tooltip content="Deaths per 100,000 live births">
                              <Info className="h-4 w-4 ml-1 text-gray-400" />
                            </Tooltip>
                          </div>
                        </TableHead>
                        <TableHead>Skilled Birth Attendance (%)</TableHead>
                        <TableHead>Antenatal Care (%)</TableHead>
                        <TableHead>Institutional Delivery (%)</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMaternalData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.province}</TableCell>
                          <TableCell>{item.maternalMortalityRatio}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{item.percentSkilledBirthAttendance.toFixed(1)}%</span>
                              <div className="mt-1">
                                <Progress 
                                  value={item.percentSkilledBirthAttendance} 
                                  className="h-2"
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{item.percentAntenatalCare.toFixed(1)}%</span>
                              <div className="mt-1">
                                <Progress 
                                  value={item.percentAntenatalCare} 
                                  className="h-2"
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{item.percentInstitutionalDelivery.toFixed(1)}%</span>
                              <div className="mt-1">
                                <Progress 
                                  value={item.percentInstitutionalDelivery} 
                                  className="h-2"
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`
                              ${item.maternalMortalityRatio < 200 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 
                                item.maternalMortalityRatio < 250 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' :
                                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'}
                            `}>
                              {item.maternalMortalityRatio < 200 ? 'Good' : 
                               item.maternalMortalityRatio < 250 ? 'Average' : 
                               'Needs Improvement'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400">
                No maternal health data available for the selected filters
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthDashboard;
