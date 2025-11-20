"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const data = [
  { day: 'Seg', mensagens: 400 },
  { day: 'Ter', mensagens: 300 },
  { day: 'Qua', mensagens: 500 },
  { day: 'Qui', mensagens: 280 },
  { day: 'Sex', mensagens: 600 },
];

const Analytics = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Conversas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">1.234</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Taxa Resposta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">95%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tempo Médio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">2m 15s</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Novos Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">56</div>
        </CardContent>
      </Card>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Mensagens por Dia</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="mensagens" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Conversas por Canal</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[{ canal: 'WhatsApp', qtd: 80 }, { canal: 'Webchat', qtd: 20 }]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="canal" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="qtd" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Analytics;