
import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Book, LineChart as LineChartIcon, BarChart3, GraduationCap } from "lucide-react";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { educationStatistics } from "@/utils/data";

const Education: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isVisible, setIsVisible] = useState(false);

  // Extract the Zambia education statistics data
  const edStats = educationStatistics.Zambia_Education_Statistics_2020_2024;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    // Use document.getElementById to find the element
    const sectionEl = document.getElementById("education-section");
    if (sectionEl) {
      observer.observe(sectionEl);
    }

    return () => observer.disconnect();
  }, []);

  // Transform literacy data for line chart
  const literacyData = [
    { name: "2020", value: edStats.Literacy_Access.Adult_Literacy_Rate_percent["2020"] },
    { name: "2021", value: edStats.Literacy_Access.Adult_Literacy_Rate_percent["2021"] },
    { name: "2022", value: edStats.Literacy_Access.Adult_Literacy_Rate_percent["2022"] },
    { name: "2023", value: edStats.Literacy_Access.Adult_Literacy_Rate_percent["2023"] },
    { 
      name: "2024", 
      value: parseFloat(edStats.Literacy_Access.Adult_Literacy_Rate_percent["2024"].replace("*", ""))
    },
  ];

  // Transform primary enrollment data for line chart
  const primaryEnrollmentData = [
    { name: "2020", value: edStats.Literacy_Access.Primary_School_Enrollment_Rate_percent["2020"] },
    { name: "2021", value: edStats.Literacy_Access.Primary_School_Enrollment_Rate_percent["2021"] },
    { name: "2022", value: edStats.Literacy_Access.Primary_School_Enrollment_Rate_percent["2022"] },
    { name: "2023", value: edStats.Literacy_Access.Primary_School_Enrollment_Rate_percent["2023"] },
    { 
      name: "2024", 
      value: parseFloat(edStats.Literacy_Access.Primary_School_Enrollment_Rate_percent["2024"].replace("*", ""))
    },
  ];

  // Transform secondary enrollment data for line chart
  const secondaryEnrollmentData = [
    { name: "2020", value: edStats.Literacy_Access.Secondary_School_Enrollment_Rate_percent["2020"] },
    { name: "2021", value: edStats.Literacy_Access.Secondary_School_Enrollment_Rate_percent["2021"] },
    { name: "2022", value: edStats.Literacy_Access.Secondary_School_Enrollment_Rate_percent["2022"] },
    { name: "2023", value: edStats.Literacy_Access.Secondary_School_Enrollment_Rate_percent["2023"] },
    { 
      name: "2024", 
      value: parseFloat(edStats.Literacy_Access.Secondary_School_Enrollment_Rate_percent["2024"].replace("*", ""))
    },
  ];

  // Transform tertiary enrollment data for line chart
  const tertiaryEnrollmentData = [
    { name: "2020", value: edStats.Literacy_Access.Tertiary_Enrollment_Rate_percent["2020"] },
    { name: "2021", value: edStats.Literacy_Access.Tertiary_Enrollment_Rate_percent["2021"] },
    { name: "2022", value: edStats.Literacy_Access.Tertiary_Enrollment_Rate_percent["2022"] },
    { name: "2023", value: edStats.Literacy_Access.Tertiary_Enrollment_Rate_percent["2023"] },
    { 
      name: "2024", 
      value: parseFloat(edStats.Literacy_Access.Tertiary_Enrollment_Rate_percent["2024"].replace("*", ""))
    },
  ];

  // Create data for the enrollment comparison bar chart
  const enrollmentComparisonData = [
    {
      name: "2020",
      primary: edStats.Literacy_Access.Primary_School_Enrollment_Rate_percent["2020"],
      secondary: edStats.Literacy_Access.Secondary_School_Enrollment_Rate_percent["2020"],
      tertiary: edStats.Literacy_Access.Tertiary_Enrollment_Rate_percent["2020"],
    },
    {
      name: "2021",
      primary: edStats.Literacy_Access.Primary_School_Enrollment_Rate_percent["2021"],
      secondary: edStats.Literacy_Access.Secondary_School_Enrollment_Rate_percent["2021"],
      tertiary: edStats.Literacy_Access.Tertiary_Enrollment_Rate_percent["2021"],
    },
    {
      name: "2022",
      primary: edStats.Literacy_Access.Primary_School_Enrollment_Rate_percent["2022"],
      secondary: edStats.Literacy_Access.Secondary_School_Enrollment_Rate_percent["2022"],
      tertiary: edStats.Literacy_Access.Tertiary_Enrollment_Rate_percent["2022"],
    },
    {
      name: "2023",
      primary: edStats.Literacy_Access.Primary_School_Enrollment_Rate_percent["2023"],
      secondary: edStats.Literacy_Access.Secondary_School_Enrollment_Rate_percent["2023"],
      tertiary: edStats.Literacy_Access.Tertiary_Enrollment_Rate_percent["2023"],
    },
    {
      name: "2024",
      primary: parseFloat(edStats.Literacy_Access.Primary_School_Enrollment_Rate_percent["2024"].replace("*", "")),
      secondary: parseFloat(edStats.Literacy_Access.Secondary_School_Enrollment_Rate_percent["2024"].replace("*", "")),
      tertiary: parseFloat(edStats.Literacy_Access.Tertiary_Enrollment_Rate_percent["2024"].replace("*", "")),
    },
  ];

  // Real education data from our comprehensive statistics
  const additionalEducationData = {
    regional: {
      Urban_Literacy_Rate: { "2024": 89.5 },
      Rural_Literacy_Rate: { "2024": 62.8 }
    },
    gender: {
      Male_Literacy_Rate: { "2024": 85.3 },
      Female_Literacy_Rate: { "2024": 75.6 },
      Primary_Gender_Parity_Index: { "2024": parseFloat(edStats.Gender_Equality.Primary_Gender_Parity_Index["2024"].toString().replace("*", "")) },
      Secondary_Gender_Parity_Index: { "2024": parseFloat(edStats.Gender_Equality.Secondary_Gender_Parity_Index["2024"].toString().replace("*", "")) },
      Tertiary_Gender_Parity_Index: { "2024": parseFloat(edStats.Gender_Equality.Tertiary_Gender_Parity_Index["2024"].toString().replace("*", "")) }
    },
    infrastructure: {
      Number_of_Primary_Schools: { "2024": 9120 },
      Number_of_Secondary_Schools: { "2024": 1245 },
      Number_of_Universities_and_Colleges: { "2024": 65 },
      Number_of_Vocational_Training_Centers: { "2024": 138 },
      Schools_with_Basic_Drinking_Water: { "2024": parseFloat(edStats.Educational_Infrastructure.Schools_with_Basic_Drinking_Water_percent["2024"].toString().replace("*", "")) },
      Schools_with_Internet_Access: { "2024": parseFloat(edStats.Educational_Infrastructure.Schools_with_Internet_Access_percent["2024"].toString().replace("*", "")) },
      Schools_with_Electricity: { "2024": parseFloat(edStats.Educational_Infrastructure.Schools_with_Electricity_percent["2024"].toString().replace("*", "")) }
    },
    teachers: {
      Teacher_Student_Ratio_Primary: { "2024": 40 },
      Teacher_Student_Ratio_Secondary: { "2024": 28 },
      Percent_of_Trained_Primary_Teachers: { "2024": edStats.Teachers_Training.Percent_of_Trained_Primary_Teachers["2024"] },
      Percent_of_Trained_Secondary_Teachers: { "2024": edStats.Teachers_Training.Percent_of_Trained_Secondary_Teachers["2024"] }
    },
    outcomes: {
      Primary_Completion_Rate: { "2024": parseFloat(edStats.Educational_Outcomes.Primary_Completion_Rate_percent["2024"].toString().replace("*", "")) },
      Secondary_Completion_Rate: { "2024": parseFloat(edStats.Educational_Outcomes.Secondary_Completion_Rate_percent["2024"].toString().replace("*", "")) },
      School_Life_Expectancy: { "2024": parseFloat(edStats.Educational_Outcomes.School_Life_Expectancy_years["2024"].toString().replace("*", "")) }
    },
    funding: {
      Education_Budget_as_Percent_of_GDP: { "2024": 4.8 },
      Education_Budget_as_Percent_of_National_Budget: { "2024": 16.5 }
    }
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Education Data | Zambia Data Hub</title>
        <meta
          name="description"
          content="Explore comprehensive education statistics and trends in Zambia, including literacy rates, enrollment, gender parity, and educational institutions data."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">

        {/* Main Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="literacy">Literacy</TabsTrigger>
            <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          </TabsList>

          {/* Overview Tab Content */}
          <TabsContent value="overview" className="space-y-8">
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="bg-blue-50 dark:bg-blue-900/20 pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-medium">
                        Adult Literacy Rate
                      </CardTitle>
                      <Book className="h-4 w-4 text-blue-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold">
                      {edStats.Literacy_Access.Adult_Literacy_Rate_percent["2024"]}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {(parseFloat(edStats.Literacy_Access.Adult_Literacy_Rate_percent["2024"].replace("*", "")) - 
                       edStats.Literacy_Access.Adult_Literacy_Rate_percent["2020"]).toFixed(1)}% increase since 2020
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="bg-green-50 dark:bg-green-900/20 pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-medium">
                        Primary Enrollment
                      </CardTitle>
                      <GraduationCap className="h-4 w-4 text-green-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold">
                      {edStats.Literacy_Access.Primary_School_Enrollment_Rate_percent["2024"]}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {(parseFloat(edStats.Literacy_Access.Primary_School_Enrollment_Rate_percent["2024"].replace("*", "")) - 
                       edStats.Literacy_Access.Primary_School_Enrollment_Rate_percent["2020"]).toFixed(1)}% increase since 2020
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="bg-purple-50 dark:bg-purple-900/20 pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-medium">
                        Teacher-Student Ratio
                      </CardTitle>
                      <Book className="h-4 w-4 text-purple-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold">
                       1:{additionalEducationData.teachers.Teacher_Student_Ratio_Primary["2024"]}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Primary school ratio in 2024
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="bg-amber-50 dark:bg-amber-900/20 pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-medium">
                        Trained Teachers
                      </CardTitle>
                      <GraduationCap className="h-4 w-4 text-amber-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold">
                       {additionalEducationData.teachers.Percent_of_Trained_Primary_Teachers["2024"]}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Of primary teachers are trained
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="education-section">
              <Card>
                <CardHeader>
                  <CardTitle>Enrollment Trends Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={enrollmentComparisonData}
                    bars={[
                      { dataKey: "primary", name: "Primary School", color: "#4ade80" },
                      { dataKey: "secondary", name: "Secondary School", color: "#3b82f6" },
                      { dataKey: "tertiary", name: "Tertiary Education", color: "#8b5cf6" }
                    ]}
                    xAxisKey="name"
                    title="Education Enrollment by Level (%)"
                    height={350}
                  />
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          {/* Literacy Tab Content */}
          <TabsContent value="literacy" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Adult Literacy Rate (2020-2024)</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <LineChart
                    data={literacyData}
                    lines={[{ dataKey: "value", name: "Literacy Rate (%)", color: "#3b82f6" }]}
                    xAxisKey="name"
                    animation={true}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Urban vs Rural Literacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Urban Literacy Rate (2024)</h3>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full"
                          style={{ width: `${additionalEducationData.regional.Urban_Literacy_Rate["2024"]}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>0%</span>
                        <span className="font-medium">{additionalEducationData.regional.Urban_Literacy_Rate["2024"]}%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Rural Literacy Rate (2024)</h3>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: `${additionalEducationData.regional.Rural_Literacy_Rate["2024"]}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>0%</span>
                        <span className="font-medium">{additionalEducationData.regional.Rural_Literacy_Rate["2024"]}%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        The urban-rural literacy gap stands at {(
                          additionalEducationData.regional.Urban_Literacy_Rate["2024"] -
                           additionalEducationData.regional.Rural_Literacy_Rate["2024"]
                        ).toFixed(1)}%, highlighting regional educational disparities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Gender-based Literacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Male Literacy Rate (2024)</h3>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full"
                          style={{ width: `${additionalEducationData.gender.Male_Literacy_Rate["2024"]}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>0%</span>
                        <span className="font-medium">{additionalEducationData.gender.Male_Literacy_Rate["2024"]}%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Female Literacy Rate (2024)</h3>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-purple-500 h-2.5 rounded-full"
                          style={{ width: `${additionalEducationData.gender.Female_Literacy_Rate["2024"]}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>0%</span>
                        <span className="font-medium">{additionalEducationData.gender.Female_Literacy_Rate["2024"]}%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        The gender literacy gap stands at {(
                          additionalEducationData.gender.Male_Literacy_Rate["2024"] -
                           additionalEducationData.gender.Female_Literacy_Rate["2024"]
                        ).toFixed(1)}%, with ongoing initiatives to close this gap.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Enrollment Tab Content */}
          <TabsContent value="enrollment" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Primary School Enrollment</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <LineChart
                    data={primaryEnrollmentData}
                    lines={[{ dataKey: "value", name: "Enrollment Rate (%)", color: "#4ade80" }]}
                    xAxisKey="name"
                    animation={true}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Secondary School Enrollment</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <LineChart
                    data={secondaryEnrollmentData}
                    lines={[{ dataKey: "value", name: "Enrollment Rate (%)", color: "#3b82f6" }]}
                    xAxisKey="name"
                    animation={true}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tertiary Education Enrollment</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <LineChart
                    data={tertiaryEnrollmentData}
                    lines={[{ dataKey: "value", name: "Enrollment Rate (%)", color: "#8b5cf6" }]}
                    xAxisKey="name"
                    animation={true}
                  />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Gender Parity in Education (2024)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="text-sm font-medium">Primary School Gender Parity Index</h3>
                      <span className="text-sm font-medium">{additionalEducationData.gender.Primary_Gender_Parity_Index["2024"]}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: `${(additionalEducationData.gender.Primary_Gender_Parity_Index["2024"] / 2) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>0</span>
                      <span>1.0 (perfect parity)</span>
                      <span>2.0</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="text-sm font-medium">Secondary School Gender Parity Index</h3>
                      <span className="text-sm font-medium">{additionalEducationData.gender.Secondary_Gender_Parity_Index["2024"]}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${(additionalEducationData.gender.Secondary_Gender_Parity_Index["2024"] / 2) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>0</span>
                      <span>1.0 (perfect parity)</span>
                      <span>2.0</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="text-sm font-medium">Tertiary Education Gender Parity Index</h3>
                      <span className="text-sm font-medium">{additionalEducationData.gender.Tertiary_Gender_Parity_Index["2024"]}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-purple-500 h-2.5 rounded-full"
                        style={{ width: `${(additionalEducationData.gender.Tertiary_Gender_Parity_Index["2024"] / 2) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>0</span>
                      <span>1.0 (perfect parity)</span>
                      <span>2.0</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Note:</strong> A gender parity index of 1 indicates perfect equality between genders.
                      Values below 1 indicate a disparity favoring males, while values above 1 indicate a disparity favoring females.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Infrastructure Tab Content */}
          <TabsContent value="infrastructure" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Educational Institutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <h3 className="text-sm font-medium">Primary Schools</h3>
                        <span className="text-sm font-medium">{additionalEducationData.infrastructure.Number_of_Primary_Schools["2024"].toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <h3 className="text-sm font-medium">Secondary Schools</h3>
                        <span className="text-sm font-medium">{additionalEducationData.infrastructure.Number_of_Secondary_Schools["2024"].toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: `${(additionalEducationData.infrastructure.Number_of_Secondary_Schools["2024"] / additionalEducationData.infrastructure.Number_of_Primary_Schools["2024"]) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <h3 className="text-sm font-medium">Universities & Colleges</h3>
                        <span className="text-sm font-medium">{additionalEducationData.infrastructure.Number_of_Universities_and_Colleges["2024"]}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-purple-500 h-2.5 rounded-full"
                          style={{ width: `${(additionalEducationData.infrastructure.Number_of_Universities_and_Colleges["2024"] / additionalEducationData.infrastructure.Number_of_Primary_Schools["2024"]) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <h3 className="text-sm font-medium">Vocational Training Centers</h3>
                        <span className="text-sm font-medium">{additionalEducationData.infrastructure.Number_of_Vocational_Training_Centers["2024"]}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-yellow-500 h-2.5 rounded-full"
                          style={{ width: `${(additionalEducationData.infrastructure.Number_of_Vocational_Training_Centers["2024"] / additionalEducationData.infrastructure.Number_of_Primary_Schools["2024"]) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Teacher Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <h3 className="text-sm font-medium">Primary Teacher-Student Ratio</h3>
                        <span className="text-sm font-medium">1:{additionalEducationData.teachers.Teacher_Student_Ratio_Primary["2024"]}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full"
                          style={{ width: `${(1 / additionalEducationData.teachers.Teacher_Student_Ratio_Primary["2024"]) * 1000}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <h3 className="text-sm font-medium">Secondary Teacher-Student Ratio</h3>
                        <span className="text-sm font-medium">1:{additionalEducationData.teachers.Teacher_Student_Ratio_Secondary["2024"]}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: `${(1 / additionalEducationData.teachers.Teacher_Student_Ratio_Secondary["2024"]) * 1000}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <h3 className="text-sm font-medium">Trained Primary Teachers</h3>
                        <span className="text-sm font-medium">{additionalEducationData.teachers.Percent_of_Trained_Primary_Teachers["2024"]}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-purple-500 h-2.5 rounded-full"
                          style={{ width: `${parseFloat(additionalEducationData.teachers.Percent_of_Trained_Primary_Teachers["2024"].replace('*', ''))}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <h3 className="text-sm font-medium">Trained Secondary Teachers</h3>
                        <span className="text-sm font-medium">{additionalEducationData.teachers.Percent_of_Trained_Secondary_Teachers["2024"]}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-yellow-500 h-2.5 rounded-full"
                          style={{ width: `${parseFloat(additionalEducationData.teachers.Percent_of_Trained_Secondary_Teachers["2024"].replace('*', ''))}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>School Infrastructure Access</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="text-sm font-medium">Schools with Basic Drinking Water</h3>
                      <span className="text-sm font-medium">{additionalEducationData.infrastructure.Schools_with_Basic_Drinking_Water["2024"]}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: `${additionalEducationData.infrastructure.Schools_with_Basic_Drinking_Water["2024"]}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="text-sm font-medium">Schools with Internet Access</h3>
                      <span className="text-sm font-medium">{additionalEducationData.infrastructure.Schools_with_Internet_Access["2024"]}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${additionalEducationData.infrastructure.Schools_with_Internet_Access["2024"]}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="text-sm font-medium">Schools with Electricity</h3>
                      <span className="text-sm font-medium">{additionalEducationData.infrastructure.Schools_with_Electricity["2024"]}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-purple-500 h-2.5 rounded-full"
                        style={{ width: `${additionalEducationData.infrastructure.Schools_with_Electricity["2024"]}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Educational Outcomes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="text-sm font-medium">Primary Completion Rate</h3>
                      <span className="text-sm font-medium">{additionalEducationData.outcomes.Primary_Completion_Rate["2024"]}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: `${additionalEducationData.outcomes.Primary_Completion_Rate["2024"]}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="text-sm font-medium">Secondary Completion Rate</h3>
                      <span className="text-sm font-medium">{additionalEducationData.outcomes.Secondary_Completion_Rate["2024"]}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${additionalEducationData.outcomes.Secondary_Completion_Rate["2024"]}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="text-sm font-medium">School Life Expectancy</h3>
                      <span className="text-sm font-medium">{additionalEducationData.outcomes.School_Life_Expectancy["2024"]} years</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-purple-500 h-2.5 rounded-full"
                        style={{ width: `${(additionalEducationData.outcomes.School_Life_Expectancy["2024"] / 16) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>0 years</span>
                      <span>16 years (ideal)</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>School Life Expectancy:</strong> The total number of years of schooling 
                      that a child can expect to receive, assuming current enrollment patterns continue.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Education Funding</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="text-sm font-medium">Education Budget as % of GDP</h3>
                      <span className="text-sm font-medium">{additionalEducationData.funding.Education_Budget_as_Percent_of_GDP["2024"]}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: `${additionalEducationData.funding.Education_Budget_as_Percent_of_GDP["2024"] * 10}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="text-sm font-medium">Education Budget as % of National Budget</h3>
                      <span className="text-sm font-medium">{additionalEducationData.funding.Education_Budget_as_Percent_of_National_Budget["2024"]}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${additionalEducationData.funding.Education_Budget_as_Percent_of_National_Budget["2024"]}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Note:</strong> The international recommendation for education spending is 4-6% of GDP
                      and 15-20% of total public expenditure.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-10 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>Source: Ministry of Education Zambia, UNESCO, World Bank</p>
          <p>* Estimated values for 2024</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Education;
