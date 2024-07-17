import Link from "next/link";
import { ArrowUpRight, CreditCard, DollarSign, Users } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TopNavigation from "@/components/layout/top-navigation";
import { PredictionChart } from "@/components/charts/prediction-chart";

async function getProductionData() {
  const res = await fetch(
    "https://api.energidataservice.dk/dataset/ElectricityProdex5MinRealtime?limit=5&offset=0&sort=Minutes5UTC%20DESC"
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

async function getSpotPrices() {
  const res = await fetch(
    "https://api.energidataservice.dk/dataset/Elspotprices?limit=5&offset=0&sort=HourUTC%20DESC"
  );

  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export interface DataPoint {
  Minutes5UTC: string;
  Minutes5DK: string;
  PriceArea: string;
  ProductionLt100MW: number;
  ProductionGe100MW: number;
  OffshoreWindPower: number;
  OnshoreWindPower: number;
  SolarPower: number;
  ExchangeGreatBelt: number;
  ExchangeGermany: number;
  ExchangeNetherlands: number;
  ExchangeGreatBritain: number;
  ExchangeNorway: number;
  ExchangeSweden: number;
  BornholmSE4: any;
}

export interface SpotPoint {
  HourUTC: string;
  HourDK: string;
  PriceArea: string;
  SpotPriceDKK: number;
  SpotPriceEUR: number;
}

export default async function Dashboard() {
  const data = await getProductionData();
  const spot = await getSpotPrices();

  data.records.map((d: unknown) => console.log(d));
  spot.records.map((d: unknown) => console.log(d));

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Price Index</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">121.84%</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscriptions
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AdSpace</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <PredictionChart />

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Household</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden xl:table-column">
                      Type
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Status
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.records.map((d: DataPoint, i: React.Key) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="font-medium">SolarPower</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {d.Minutes5UTC}
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        SolarPower
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        <Badge className="text-xs" variant="outline">
                          Approved
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                        2023-06-23
                      </TableCell>
                      <TableCell className="text-right">
                        ${d.SolarPower}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              {spot.records.map((s: SpotPoint, i: React.Key) => (
                <div className="flex items-center gap-4" key={i}>
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>{s.PriceArea}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {s.PriceArea}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {s.HourUTC}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">{s.SpotPriceEUR.toFixed(2)} €</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
