
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { Button } from "@/components/ui/button";
import { Download, Filter, Book, GraduationCap, School, Users, ChevronDown } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { educationStatistics } from "@/utils/data";

const Education = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeYear, setActiveYear] = useState("2024");
  const isInView = useInView(document.documentElement);
  
  // Format education statistics for charts
  const educationStats = educationStatistics.Zambia_Education_Statistics_2020_2024;
  
  // Prepare data for line charts
  const prepareTimeSeriesData = (metricPath: string[]) => {
    let currentObj = educationStats;
    for (const key of metricPath.slice(0, -1)) {
      if (currentObj[key]) {
        currentObj = currentObj[key];
      } else {
        return [];
      }
    }
    
    const finalKey = metricPath[metricPath.length - 1];
    if (!currentObj[finalKey]) return [];
    
    const yearData = currentObj[finalKey];
    
    return Object.keys(yearData)
      .filter(year => !isNaN(parseInt(year)))
      .map(year => ({
        name: year,
        value: typeof yearData[year] === 'string' ? 
          parseFloat(yearData[year].replace('%', '').replace('*', '')) : 
          yearData[year]
      }));
  };
  
  const literacyData = prepareTimeSeriesData(['Literacy_Access', 'Adult_Literacy_Rate_percent']);
  const primaryEnrollmentData = prepareTimeSeriesData(['Literacy_Access', 'Primary_School_Enrollment_Rate_percent']);
  const secondaryEnrollmentData = prepareTimeSeriesData(['Literacy_Access', 'Secondary_School_Enrollment_Rate_percent']);
  const tertiaryEnrollmentData = prepareTimeSeriesData(['Literacy_Access', 'Tertiary_Enrollment_Rate_percent']);
  
  // Prepare enrollment by gender data
  const enrollmentByGenderData = [
    {
      name: '2020',
      primary: educationStats.Gender_Equality.Primary_Gender_Parity_Index['2020'],
      secondary: educationStats.Gender_Equality.Secondary_Gender_Parity_Index['2020'],
      tertiary: educationStats.Gender_Equality.Tertiary_Gender_Parity_Index['2020'],
    },
    {
      name: '2021',
      primary: educationStats.Gender_Equality.Primary_Gender_Parity_Index['2021'],
      secondary: educationStats.Gender_Equality.Secondary_Gender_Parity_Index['2021'],
      tertiary: educationStats.Gender_Equality.Tertiary_Gender_Parity_Index['2021'],
    },
    {
      name: '2022',
      primary: educationStats.Gender_Equality.Primary_Gender_Parity_Index['2022'],
      secondary: educationStats.Gender_Equality.Secondary_Gender_Parity_Index['2022'],
      tertiary: educationStats.Gender_Equality.Tertiary_Gender_Parity_Index['2022'],
    },
    {
      name: '2023',
      primary: educationStats.Gender_Equality.Primary_Gender_Parity_Index['2023'],
      secondary: educationStats.Gender_Equality.Secondary_Gender_Parity_Index['2023'],
      tertiary: educationStats.Gender_Equality.Tertiary_Gender_Parity_Index['2023'],
    },
    {
      name: '2024',
      primary: parseFloat(educationStats.Gender_Equality.Primary_Gender_Parity_Index['2024'].replace('*', '')),
      secondary: parseFloat(educationStats.Gender_Equality.Secondary_Gender_Parity_Index['2024'].replace('*', '')),
      tertiary: parseFloat(educationStats.Gender_Equality.Tertiary_Gender_Parity_Index['2024'].replace('*', '')),
    },
  ];
  
  const getChangeValue = (dataset: any, metric: string) => {
    if (!dataset || dataset.length < 2) return 0;
    
    const currentValue = dataset.find((item: any) => item.name === '2024')?.value || 0;
    const previousValue = dataset.find((item: any) => item.name === '2020')?.value || 0;
    
    // Only perform calculation if both values are numbers
    if (typeof currentValue === 'number' && typeof previousValue === 'number') {
      return currentValue - previousValue;
    }
    return 0;
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Education Data | Zambia Data Hub</title>
        <meta name="description" content="Explore Zambia's education statistics, trends, and key indicators related to literacy, enrollment, teacher training and more." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-200/60 dark:bg-amber-800/30 text-amber-800 dark:text-amber-300 mb-6">
              <Book className="w-4 h-4 mr-2" />
              <span>Educational Insights</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Education Data Explorer
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
              Explore Zambia's progress in education through comprehensive data on literacy, 
              enrollment rates, student-teacher ratios, and educational outcomes.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button
                className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-6"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Enrollment Statistics
              </Button>
              <Button
                variant="outline"
                className="font-medium border-amber-600 text-amber-700 dark:text-amber-400 dark:border-amber-500"
              >
                <School className="w-4 h-4 mr-2" />
                Education Quality Metrics
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="font-medium">
                    <Download className="w-4 h-4 mr-2" />
                    Download Data
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Excel (.xlsx)</DropdownMenuItem>
                  <DropdownMenuItem>CSV</DropdownMenuItem>
                  <DropdownMenuItem>PDF Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Education Statistics
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Explore key education metrics and trends from 2020-2024
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Year: {activeYear} <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setActiveYear("2020")}>2020</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveYear("2021")}>2021</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveYear("2022")}>2022</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveYear("2023")}>2023</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveYear("2024")}>2024</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="w-full md:w-auto grid grid-cols-2 md:flex md:space-x-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
              <TabsTrigger value="gender">Gender Equality</TabsTrigger>
              <TabsTrigger value="quality">Education Quality</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader className="pb-3 pt-6">
                    <CardTitle className="flex justify-between">
                      <span className="text-lg font-medium">Adult Literacy Rate</span>
                      <Book className="h-5 w-5 text-blue-500" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-1">{educationStats.Literacy_Access.Adult_Literacy_Rate_percent[activeYear]}%</div>
                    <div className={`text-sm ${getChangeValue(literacyData, 'literacy') >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {getChangeValue(literacyData, 'literacy') >= 0 ? '+' : ''}{getChangeValue(literacyData, 'literacy').toFixed(1)}% since 2020
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader className="pb-3 pt-6">
                    <CardTitle className="flex justify-between">
                      <span className="text-lg font-medium">Primary Enrollment</span>
                      <School className="h-5 w-5 text-green-500" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-1">{educationStats.Literacy_Access.Primary_School_Enrollment_Rate_percent[activeYear]}%</div>
                    <div className={`text-sm ${getChangeValue(primaryEnrollmentData, 'primary') >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {getChangeValue(primaryEnrollmentData, 'primary') >= 0 ? '+' : ''}{getChangeValue(primaryEnrollmentData, 'primary').toFixed(1)}% since 2020
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader className="pb-3 pt-6">
                    <CardTitle className="flex justify-between">
                      <span className="text-lg font-medium">Secondary Enrollment</span>
                      <GraduationCap className="h-5 w-5 text-purple-500" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-1">{educationStats.Literacy_Access.Secondary_School_Enrollment_Rate_percent[activeYear]}%</div>
                    <div className={`text-sm ${getChangeValue(secondaryEnrollmentData, 'secondary') >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {getChangeValue(secondaryEnrollmentData, 'secondary') >= 0 ? '+' : ''}{getChangeValue(secondaryEnrollmentData, 'secondary').toFixed(1)}% since 2020
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader className="pb-3 pt-6">
                    <CardTitle className="flex justify-between">
                      <span className="text-lg font-medium">Tertiary Enrollment</span>
                      <Users className="h-5 w-5 text-orange-500" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-1">{educationStats.Literacy_Access.Tertiary_Enrollment_Rate_percent[activeYear]}%</div>
                    <div className={`text-sm ${getChangeValue(tertiaryEnrollmentData, 'tertiary') >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {getChangeValue(tertiaryEnrollmentData, 'tertiary') >= 0 ? '+' : ''}{getChangeValue(tertiaryEnrollmentData, 'tertiary').toFixed(1)}% since 2020
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Literacy & Enrollment Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <LineChart 
                      data={literacyData}
                      xAxisKey="name"
                      lineKey="value"
                      strokeColor="#3b82f6"
                      animation={true}
                    />
                    <div className="mt-2 text-center text-sm text-gray-500">Adult Literacy Rate (%) 2020-2024</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Primary School Enrollment</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <LineChart 
                      data={primaryEnrollmentData}
                      xAxisKey="name"
                      lineKey="value"
                      strokeColor="#10b981"
                      animation={true}
                    />
                    <div className="mt-2 text-center text-sm text-gray-500">Primary School Enrollment Rate (%) 2020-2024</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Secondary School Enrollment</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <LineChart 
                      data={secondaryEnrollmentData}
                      xAxisKey="name"
                      lineKey="value"
                      strokeColor="#8b5cf6"
                      animation={true}
                    />
                    <div className="mt-2 text-center text-sm text-gray-500">Secondary School Enrollment Rate (%) 2020-2024</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Tertiary Enrollment</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <LineChart 
                      data={tertiaryEnrollmentData}
                      xAxisKey="name"
                      lineKey="value"
                      strokeColor="#f97316"
                      animation={true}
                    />
                    <div className="mt-2 text-center text-sm text-gray-500">Tertiary Enrollment Rate (%) 2020-2024</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="gender" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gender Parity Index by Education Level</CardTitle>
                </CardHeader>
                <CardContent className="h-[500px]">
                  <BarChart 
                    data={enrollmentByGenderData}
                    xAxisKey="name"
                    bars={[
                      { dataKey: "primary", name: "Primary", color: "#3b82f6" },
                      { dataKey: "secondary", name: "Secondary", color: "#8b5cf6" },
                      { dataKey: "tertiary", name: "Tertiary", color: "#f97316" }
                    ]}
                    title="Gender Parity Index (Female to Male Ratio)"
                    height={440}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="enrollment" className="space-y-6">
              <p className="text-gray-600 dark:text-gray-300 italic">Enrollment data view coming soon...</p>
            </TabsContent>
            
            <TabsContent value="quality" className="space-y-6">
              <p className="text-gray-600 dark:text-gray-300 italic">Education quality metrics coming soon...</p>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </PageLayout>
  );
};

export default Education;
