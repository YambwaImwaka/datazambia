
import React, { useState } from "react";
import { motion } from "framer-motion";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Book, 
  GraduationCap, 
  School, 
  Users, 
  Building, 
  DollarSign,
  FileText,
  FileBarChart,
  FilePieChart,
  ChevronRight
} from "lucide-react";
import { educationStatistics, provinces, educationMetrics } from "@/utils/data";
import PageLayout from "@/components/layout/PageLayout";

const Education = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const stats = educationStatistics.Zambia_Education_Statistics_2020_2024;
  
  // Prepare data for charts
  const prepareChartData = (dataObject: Record<string, any>) => {
    return Object.keys(dataObject)
      .filter(year => year !== "source" && year !== "note")
      .map(year => ({
        year,
        value: typeof dataObject[year] === "string" 
          ? parseFloat(dataObject[year].replace("*", ""))
          : dataObject[year]
      }));
  };

  const literacyData = prepareChartData(stats.Literacy_Access.Adult_Literacy_Rate_percent);
  const enrollmentData = prepareChartData(stats.Literacy_Access.Primary_School_Enrollment_Rate_percent);
  const secondaryData = prepareChartData(stats.Literacy_Access.Secondary_School_Enrollment_Rate_percent);
  const budgetData = prepareChartData(stats.Budget_Investment.Education_Budget_percent_of_GDP);
  
  // Format enrollment data for provinces
  const provinceEnrollmentData = provinces.map(province => ({
    name: province.name,
    primary: educationMetrics.primaryEnrollment.find(item => item.province === province.name)?.value || 0,
    secondary: educationMetrics.secondaryEnrollment.find(item => item.province === province.name)?.value || 0,
    tertiary: educationMetrics.tertiaryEnrollment.find(item => item.province === province.name)?.value || 0,
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 mb-4">
            <Book size={18} className="mr-2" />
            <span className="font-medium">Education Data</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Zambia Education Statistics</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive data on educational outcomes, infrastructure, and investments across Zambia from 2020 to 2024.
          </p>
        </motion.div>

        {/* Key Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="border-t-4 border-t-amber-500 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Adult Literacy Rate</p>
                    <h3 className="text-3xl font-bold mb-1">{stats.Literacy_Access.Adult_Literacy_Rate_percent["2024"]}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Source: {stats.Literacy_Access.Adult_Literacy_Rate_percent.source}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/30">
                    <Book className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-t-4 border-t-blue-500 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Primary Enrollment</p>
                    <h3 className="text-3xl font-bold mb-1">{stats.Literacy_Access.Primary_School_Enrollment_Rate_percent["2024"]}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Source: {stats.Literacy_Access.Primary_School_Enrollment_Rate_percent.source}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                    <School className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-t-4 border-t-green-500 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Budget Allocation</p>
                    <h3 className="text-3xl font-bold mb-1">{stats.Budget_Investment.Education_Budget_percent_of_GDP["2024"]}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Source: {stats.Budget_Investment.Education_Budget_percent_of_GDP.source}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/30">
                    <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-t-4 border-t-purple-500 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Schools with Electricity</p>
                    <h3 className="text-3xl font-bold mb-1">{stats.Infrastructure.Percent_of_Schools_with_Electricity["2024"]}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Source: {stats.Infrastructure.Percent_of_Schools_with_Electricity.source}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30">
                    <Building className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-transparent mb-8">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400"
              >
                <FileText className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="trends" 
                className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-400"
              >
                <FileBarChart className="h-4 w-4 mr-2" />
                Trends
              </TabsTrigger>
              <TabsTrigger 
                value="geography" 
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900/30 dark:data-[state=active]:text-purple-400"
              >
                <FilePieChart className="h-4 w-4 mr-2" />
                Geographic Data
              </TabsTrigger>
              <TabsTrigger 
                value="factors" 
                className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-700 dark:data-[state=active]:bg-amber-900/30 dark:data-[state=active]:text-amber-400"
              >
                <Users className="h-4 w-4 mr-2" />
                Success Factors
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gray-50 dark:bg-gray-800/50 py-4">
                    <CardTitle className="flex items-center text-lg">
                      <Book size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
                      Literacy & Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Adult Literacy Rate (%)</h4>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-500">2020</span>
                          <span className="text-sm font-medium">{stats.Literacy_Access.Adult_Literacy_Rate_percent["2020"]}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${stats.Literacy_Access.Adult_Literacy_Rate_percent["2020"]}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Youth Literacy Rate (15-24 years, %)</h4>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-500">2020</span>
                          <span className="text-sm font-medium">{stats.Literacy_Access.Youth_Literacy_Rate_15_24_percent["2020"]}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${stats.Literacy_Access.Youth_Literacy_Rate_15_24_percent["2020"]}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Secondary School Enrollment (%)</h4>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-500">2020</span>
                          <span className="text-sm font-medium">{stats.Literacy_Access.Secondary_School_Enrollment_Rate_percent["2020"]}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${stats.Literacy_Access.Secondary_School_Enrollment_Rate_percent["2020"]}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gray-50 dark:bg-gray-800/50 py-4">
                    <CardTitle className="flex items-center text-lg">
                      <Building size={18} className="mr-2 text-green-600 dark:text-green-400" />
                      Infrastructure & Budget
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Primary Schools</h4>
                          <p className="text-3xl font-bold">{stats.Infrastructure.Number_of_Primary_Schools["2024"]}</p>
                          <p className="text-sm text-gray-500">Source: {stats.Infrastructure.Number_of_Primary_Schools.source}</p>
                        </div>
                        <School size={36} className="text-blue-500 opacity-50" />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Education Budget</h4>
                          <p className="text-3xl font-bold">${stats.Budget_Investment.Education_Budget_USD_billions["2024"]}B</p>
                          <p className="text-sm text-gray-500">Source: {stats.Budget_Investment.Education_Budget_USD_billions.source}</p>
                        </div>
                        <DollarSign size={36} className="text-green-500 opacity-50" />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Pupil-Teacher Ratio</h4>
                          <p className="text-3xl font-bold">{stats.Teachers_Training.Pupil_Teacher_Ratio_Primary["2024"]}</p>
                          <p className="text-sm text-gray-500">Source: {stats.Teachers_Training.Pupil_Teacher_Ratio_Primary.source}</p>
                        </div>
                        <Users size={36} className="text-amber-500 opacity-50" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="trends" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Adult Literacy Rate Trend (2020-2024)</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <LineChart 
                      data={literacyData.map(d => ({ name: d.year, value: d.value }))} 
                      xAxisKey="name"
                      lineKey="value"
                      strokeColor="#8884d8" 
                      animation={true}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Primary School Enrollment Trend (2020-2024)</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <LineChart 
                      data={enrollmentData.map(d => ({ name: d.year, value: d.value }))} 
                      xAxisKey="name"
                      lineKey="value"
                      strokeColor="#82ca9d" 
                      animation={true}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Secondary School Enrollment Trend (2020-2024)</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <LineChart 
                      data={secondaryData.map(d => ({ name: d.year, value: d.value }))} 
                      xAxisKey="name"
                      lineKey="value"
                      strokeColor="#ffc658" 
                      animation={true}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Education Budget as % of GDP (2020-2024)</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <LineChart 
                      data={budgetData.map(d => ({ name: d.year, value: d.value }))} 
                      xAxisKey="name"
                      lineKey="value"
                      strokeColor="#ff7300" 
                      animation={true}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="geography" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Education Metrics by Province</CardTitle>
                </CardHeader>
                <CardContent className="h-[600px]">
                  <BarChart 
                    data={provinceEnrollmentData}
                    keys={["primary", "secondary", "tertiary"]}
                    indexBy="name"
                    colors={["#8884d8", "#82ca9d", "#ffc658"]}
                    title="Enrollment Rates by Province (%)"
                    legends={["Primary", "Secondary", "Tertiary"]}
                  />
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {provinces.slice(0, 6).map((province) => (
                  <Card key={province.id} className="hover:shadow-md transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <School className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{province.name}</h3>
                          <p className="text-sm text-gray-500">Literacy rate: {province.literacy}%</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Primary Enrollment</span>
                            <span className="text-sm font-medium">
                              {educationMetrics.primaryEnrollment.find(item => item.province === province.name)?.value || 0}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${educationMetrics.primaryEnrollment.find(item => item.province === province.name)?.value || 0}%` }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Secondary Enrollment</span>
                            <span className="text-sm font-medium">
                              {educationMetrics.secondaryEnrollment.find(item => item.province === province.name)?.value || 0}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: `${educationMetrics.secondaryEnrollment.find(item => item.province === province.name)?.value || 0}%` }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="link" className="mt-4 p-0 h-auto">
                        View details <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="factors" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GraduationCap className="mr-2 text-amber-600" size={20} />
                      Teacher Training
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Trained Teachers (% of total)</h4>
                        <div className="flex items-center mb-3">
                          <span className="text-2xl font-bold">{stats.Teachers_Training.Percent_of_Trained_Primary_Teachers["2024"]}</span>
                          <span className="text-sm text-green-600 font-medium ml-2">
                            +{(stats.Teachers_Training.Percent_of_Trained_Primary_Teachers["2024"] as string).replace("*", "") - 
                              stats.Teachers_Training.Percent_of_Trained_Primary_Teachers["2020"] as number}% since 2020
                          </span>
                        </div>
                        <div className="grid grid-cols-5 gap-1">
                          {Object.keys(stats.Teachers_Training.Percent_of_Trained_Primary_Teachers)
                            .filter(key => key !== "source")
                            .map((year, idx) => (
                              <div key={year} className="text-center">
                                <div className="flex flex-col items-center">
                                  <div className="h-24 w-6 bg-gray-100 dark:bg-gray-700 rounded-t-lg relative">
                                    <div 
                                      className="absolute bottom-0 w-full bg-amber-500 rounded-b-lg"
                                      style={{ 
                                        height: typeof stats.Teachers_Training.Percent_of_Trained_Primary_Teachers[year] === "string" 
                                          ? `${parseFloat(stats.Teachers_Training.Percent_of_Trained_Primary_Teachers[year].replace("*", "")) * 0.3}%` 
                                          : `${stats.Teachers_Training.Percent_of_Trained_Primary_Teachers[year] * 0.3}%` 
                                      }}
                                    ></div>
                                  </div>
                                  <span className="text-xs mt-1">{year}</span>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="mr-2 text-green-600" size={20} />
                      Budget Allocations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Education Budget (USD Billions)</h4>
                          <span className="text-sm text-gray-500">Source: {stats.Budget_Investment.Education_Budget_USD_billions.source}</span>
                        </div>
                        <div className="grid grid-cols-5 gap-8">
                          {Object.keys(stats.Budget_Investment.Education_Budget_USD_billions)
                            .filter(year => year !== "source")
                            .map(year => (
                              <div key={year} className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-2">
                                  <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <p className="text-lg font-bold">
                                  ${stats.Budget_Investment.Education_Budget_USD_billions[year]}B
                                </p>
                                <p className="text-xs text-gray-500">{year}</p>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Key Challenges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                        <Users className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Out of School Children (Primary)</h4>
                        <p className="text-lg font-bold">{stats.Challenges.Out_of_School_Children_Primary_millions["2024"]} million</p>
                        <p className="text-sm text-green-600">
                          Decreased by {((stats.Challenges.Out_of_School_Children_Primary_millions["2020"] - 
                            parseFloat(stats.Challenges.Out_of_School_Children_Primary_millions["2024"].replace("*", ""))) / 
                            stats.Challenges.Out_of_School_Children_Primary_millions["2020"] * 100).toFixed(1)}% since 2020
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                        <Building className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Schools Lacking Basic Infrastructure</h4>
                        <p className="text-lg font-bold">{100 - parseFloat(stats.Infrastructure.Percent_of_Schools_with_Electricity["2024"].replace("*", ""))}%</p>
                        <p className="text-sm text-green-600">
                          Improved by {(parseFloat(stats.Infrastructure.Percent_of_Schools_with_Electricity["2024"].replace("*", "")) - 
                            stats.Infrastructure.Percent_of_Schools_with_Electricity["2020"]).toFixed(1)}% since 2020
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                        <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Higher Education Access</h4>
                        <p className="text-lg font-bold">Only {stats.Higher_Education.University_Enrollment_Rate_percent["2024"]} enrolled in universities</p>
                        <p className="text-sm text-green-600">
                          Increased by {(parseFloat(stats.Higher_Education.University_Enrollment_Rate_percent["2024"].replace("*", "")) - 
                            stats.Higher_Education.University_Enrollment_Rate_percent["2020"]).toFixed(1)}% since 2020
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        {/* Source notes */}
        <motion.div
          className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p>* Indicates preliminary data subject to revision</p>
          <p className="mt-2">Data sources: UNESCO, World Bank, Ministry of Education Zambia, Zambia Statistics Agency</p>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Education;
