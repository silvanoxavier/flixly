"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend: "up" | "down" | "neutral";
  icon?: React.ElementType;
}

export default function StatCard({ title, value, change, trend = "neutral", icon: Icon }: StatCardProps) {
  const IconComponent = Icon;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {IconComponent && <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <div className="flex items-center gap-1 mt-1">
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3 text-green-500" />
            ) : trend === "down" ? (
              <TrendingDown className="h-3 w-3 text-destructive" />
            ) : null}
            <p className="text-xs text-muted-foreground">
              {change > 0 ? `+${change}%` : `${change}%`} do dia anterior
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}