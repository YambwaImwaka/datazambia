import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cabinetMinisters, governmentStatistics, constituencies, traditionalLeaders, politicalParties } from '@/data/governmentData';
import { Users, Shield, Scale, Crown, Vote, Building, Phone, Mail, MapPin } from 'lucide-react';

export const GovernmentStructure = () => {
  const [selectedMinister, setSelectedMinister] = useState(null);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Government of Zambia
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Complete structure of the Zambian government including cabinet ministers, 
          civil service statistics, and traditional leadership.
        </p>
      </div>

      <Tabs defaultValue="cabinet" className="w-full">
        <TabsList
          className="w-full min-w-0 overflow-x-auto flex md:grid md:grid-cols-7 gap-1 md:gap-0 no-scrollbar pl-4 pr-2 scroll-snap-x"
          style={{ WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory' }}
        >
          <TabsTrigger value="cabinet" className="min-w-[110px] justify-center text-xs md:text-base scroll-snap-align">Cabinet</TabsTrigger>
          <TabsTrigger value="statistics" className="min-w-[110px] justify-center text-xs md:text-base scroll-snap-align">Statistics</TabsTrigger>
          <TabsTrigger value="constituencies" className="min-w-[110px] justify-center text-xs md:text-base scroll-snap-align">MPs</TabsTrigger>
          <TabsTrigger value="traditional" className="min-w-[130px] justify-center text-xs md:text-base scroll-snap-align">Traditional</TabsTrigger>
          <TabsTrigger value="parties" className="min-w-[110px] justify-center text-xs md:text-base scroll-snap-align">Parties</TabsTrigger>
          <TabsTrigger value="parliament" className="min-w-[130px] justify-center text-xs md:text-base scroll-snap-align">Parliament</TabsTrigger>
          <TabsTrigger value="judiciary" className="min-w-[120px] justify-center text-xs md:text-base scroll-snap-align">Judiciary</TabsTrigger>
        </TabsList>

        <TabsContent value="cabinet" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cabinetMinisters.map((minister) => (
              <Card key={minister.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedMinister(minister)}>
                <CardHeader className="text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={minister.image} alt={minister.name} />
                    <AvatarFallback>{minister.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{minister.name}</CardTitle>
                  <Badge variant="secondary">{minister.position}</Badge>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <p className="text-sm font-medium text-blue-600">{minister.portfolio}</p>
                  <p className="text-sm text-gray-600">{minister.party}</p>
                  <p className="text-xs text-gray-500">{minister.constituency}</p>
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 mt-4">
                    <div className="flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      Contact
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      Office
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedMinister && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Contact Information - {selectedMinister.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{selectedMinister.contact.office}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{selectedMinister.contact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{selectedMinister.contact.email}</span>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setSelectedMinister(null)}>
                  Close
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="statistics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Civil Service
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-blue-600">
                  {governmentStatistics.civilService.totalEmployees.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Total Government Employees</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Teachers</span>
                    <span>{governmentStatistics.civilService.breakdown.teachers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Health Workers</span>
                    <span>{governmentStatistics.civilService.breakdown.healthWorkers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Police</span>
                    <span>{governmentStatistics.civilService.breakdown.police.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Military</span>
                    <span>{governmentStatistics.civilService.breakdown.military.toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <p className="text-sm font-medium">Annual Payroll Budget</p>
                  <p className="text-lg font-bold text-green-600">{governmentStatistics.civilService.payrollBudget}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Defence Forces
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-green-600">
                  {governmentStatistics.defence.zambianDefenceForce.total.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Total Defence Personnel</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Army</span>
                    <span>{governmentStatistics.defence.zambianDefenceForce.army.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Air Force</span>
                    <span>{governmentStatistics.defence.zambianDefenceForce.airForce.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Police Service</span>
                    <span>{governmentStatistics.defence.zambiaPoliceService.total.toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <p className="text-sm font-medium">Defence Budget</p>
                  <p className="text-lg font-bold text-green-600">{governmentStatistics.defence.zambianDefenceForce.budget}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Scale className="w-5 h-5 mr-2" />
                  Judiciary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-purple-600">
                  {governmentStatistics.judiciary.supremeCourt.judges + 
                   governmentStatistics.judiciary.courtOfAppeal.judges + 
                   governmentStatistics.judiciary.highCourt.judges}
                </div>
                <p className="text-sm text-gray-600">Total Senior Judges</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Supreme Court</span>
                    <span>{governmentStatistics.judiciary.supremeCourt.judges}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Court of Appeal</span>
                    <span>{governmentStatistics.judiciary.courtOfAppeal.judges}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>High Court</span>
                    <span>{governmentStatistics.judiciary.highCourt.judges}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Magistrate Courts</span>
                    <span>{governmentStatistics.judiciary.magistrateCourts.courts}</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <p className="text-sm font-medium">Chief Justice</p>
                  <p className="text-sm font-bold">{governmentStatistics.judiciary.supremeCourt.chiefJustice}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="constituencies" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {constituencies.map((constituency, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{constituency.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{constituency.province} Province</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{constituency.mp}</p>
                      <Badge variant={constituency.party === 'UPND' ? 'default' : 'secondary'} className="text-xs">
                        {constituency.party}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="traditional" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {traditionalLeaders.map((leader, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crown className="w-5 h-5 mr-2 text-yellow-600" />
                    {leader.title} {leader.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-600">Ethnic Group</p>
                      <p>{leader.people}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Province</p>
                      <p>{leader.province}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Palace</p>
                      <p>{leader.palace}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Established</p>
                      <p>{leader.established}</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 rounded">
                    <p className="font-medium text-yellow-800">Annual Ceremony</p>
                    <p className="text-yellow-700">{leader.ceremony}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="parties" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {politicalParties.map((party, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Vote className="w-5 h-5 mr-2" />
                    {party.abbreviation}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <h3 className="font-semibold">{party.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">President</span>
                      <span className="font-medium">{party.president}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Founded</span>
                      <span>{party.foundedYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ideology</span>
                      <span>{party.ideology}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Parliament Seats</span>
                      <span className="font-bold text-blue-600">{party.currentSeats}</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <p className="font-medium text-blue-800">Strongholds</p>
                    <p className="text-blue-700 text-sm">{party.strongholds.join(', ')}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="parliament" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Parliament Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-blue-600">
                  {governmentStatistics.parliament.totalSeats}
                </div>
                <p className="text-sm text-gray-600">Total Parliamentary Seats</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>UPND Seats</span>
                    <span className="font-bold text-blue-600">{governmentStatistics.parliament.upndSeats}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>PF Seats</span>
                    <span className="font-bold text-red-600">{governmentStatistics.parliament.pfSeats}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Other Parties</span>
                    <span className="font-bold text-gray-600">{governmentStatistics.parliament.independentSeats + governmentStatistics.parliament.pnupSeats + governmentStatistics.parliament.nominatedSeats + governmentStatistics.parliament.nazSeats + governmentStatistics.parliament.ncpSeats}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Leadership
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Speaker</span>
                    <span className="font-medium">{governmentStatistics.parliament.speaker}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Deputy Speaker</span>
                    <span className="font-medium">{governmentStatistics.parliament.firstDeputySpeaker}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Leader of Opposition</span>
                    <span className="font-medium">{governmentStatistics.parliament.leaderOfOpposition}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Government Chief Whip</span>
                    <span className="font-medium">{governmentStatistics.parliament.governmentChiefWhip}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Opposition Chief Whip</span>
                    <span className="font-medium">Robert Chabinga</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Vote className="w-5 h-5 mr-2" />
                  Seating Arrangement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Government Majority</span>
                    <Badge variant="default" className="bg-blue-600">
                      {governmentStatistics.parliament.upndSeats} seats
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Opposition</span>
                    <Badge variant="secondary" className="bg-red-600">
                      {governmentStatistics.parliament.pfSeats + governmentStatistics.parliament.independentSeats + governmentStatistics.parliament.pnupSeats + governmentStatistics.parliament.nominatedSeats + governmentStatistics.parliament.nazSeats + governmentStatistics.parliament.ncpSeats} seats
                    </Badge>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <p className="text-sm font-medium">Majority Required</p>
                  <p className="text-lg font-bold text-green-600">79 seats</p>
                  <p className="text-xs text-gray-600">(50% + 1 of 156 total seats)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="judiciary" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Supreme Court</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Chief Justice</span>
                  <span className="font-medium">{governmentStatistics.judiciary.supremeCourt.chiefJustice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Number of Judges</span>
                  <span className="font-bold">{governmentStatistics.judiciary.supremeCourt.judges}</span>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  The highest court in Zambia, with final jurisdiction over all legal matters.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Court of Appeal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>President</span>
                  <span className="font-medium">{governmentStatistics.judiciary.courtOfAppeal.president}</span>
                </div>
                <div className="flex justify-between">
                  <span>Number of Judges</span>
                  <span className="font-bold">{governmentStatistics.judiciary.courtOfAppeal.judges}</span>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Intermediate appellate court hearing appeals from the High Court.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>High Court</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Number of Judges</span>
                  <span className="font-bold">{governmentStatistics.judiciary.highCourt.judges}</span>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Superior court of record with unlimited jurisdiction in civil and criminal matters.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lower Courts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Magistrate Courts</span>
                  <span className="font-bold">{governmentStatistics.judiciary.magistrateCourts.courts}</span>
                </div>
                <div className="flex justify-between">
                  <span>Local Courts</span>
                  <span className="font-bold">{governmentStatistics.judiciary.localCourts.courts}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Magistrates</span>
                  <span className="font-bold">{governmentStatistics.judiciary.magistrateCourts.magistrates}</span>
                </div>
                <div className="flex justify-between">
                  <span>Local Court Justices</span>
                  <span className="font-bold">{governmentStatistics.judiciary.localCourts.justices}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};