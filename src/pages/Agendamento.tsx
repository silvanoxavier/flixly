"use client";

import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Building2, Clock, MapPin } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface CompanyContext {
  company: { id: string; name: string; instance: string };
}

// Mock mega dataset (1000+ eventos para demo performance)
const generateEvents = (count = 1000) => {
  const events = [];
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
  const companies = ['Empresa A', 'Empresa B', 'Empresa C'];
  const employees = ['João Silva', 'Maria Santos', 'Pedro Lima', 'Ana Costa', 'Carlos Mendes'];
  
  for (let i = 0; i < count; i++) {
    const start = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1, 9 + Math.floor(Math.random() * 8), 0);
    const end = new Date(start.getTime() + (Math.random() * 4 + 1) * 60 * 60 * 1000); // 1-5h
    
    events.push({
      id: `event-${i}`,
      title: `${employees[Math.floor(Math.random() * employees.length)]} - Reunião ${companies[Math.floor(Math.random() * companies.length)]}`,
      start,
      end,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      borderColor: colors[Math.floor(Math.random() * colors.length)],
      extendedProps: {
        company: companies[Math.floor(Math.random() * companies.length)],
        location: Math.random() > 0.5 ? 'Sala 1' : 'Online',
        status: Math.random() > 0.5 ? 'Confirmado' : 'Pendente'
      }
    });
  }
  return events;
};

const mockEvents = generateEvents(1500); // Mega dataset

export default function Agendamento() {
  const { company } = useOutletContext<CompanyContext>() || { company: { name: 'Empresa A' } };
  const [calendarRef] = useState(React.createRef<FullCalendar>());
  const [currentEvents, setCurrentEvents] = useState(mockEvents);
  const [selectedView, setSelectedView] = useState('timeGridWeek');
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const { toast } = useToast();

  const employees = ['all', 'João Silva', 'Maria Santos', 'Pedro Lima', 'Ana Costa', 'Carlos Mendes'];

  const handleDateClick = (arg: any) => {
    toast({
      title: "Novo Agendamento",
      description: `Clique em ${arg.dateStr} para criar evento`
    });
  };

  const handleEventClick = (arg: any) => {
    toast({
      title: arg.event.title,
      description: `Empresa: ${arg.event.extendedProps.company} | Local: ${arg.event.extendedProps.location}`
    });
  };

  const handleEvents = (events: any[]) => {
    setCurrentEvents(events);
  };

  const filterEvents = () => {
    let filtered = mockEvents;
    if (selectedCompanyFilter !== 'all') {
      filtered = filtered.filter(e => e.extendedProps.company === selectedCompanyFilter);
    }
    if (selectedEmployee !== 'all') {
      filtered = filtered.filter(e => e.title.includes(selectedEmployee));
    }
    calendarRef.current?.getApi().removeAllEvents();
    calendarRef.current?.getApi().addEventSource(filtered);
  };

  const googleCalendarUrl = `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=YOUR_GOOGLE_API_KEY`;

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      {/* Sidebar Filtros */}
      <Card className="w-full lg:w-80 flex-shrink-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Filtros Agendamento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Empresa Atual</label>
            <Badge className="w-full justify-center">{company.name}</Badge>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Filtrar Empresa</label>
            <Select value={selectedCompanyFilter} onValueChange={setSelectedCompanyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Empresas</SelectItem>
                <SelectItem value="Empresa A">Empresa A</SelectItem>
                <SelectItem value="Empresa B">Empresa B</SelectItem>
                <SelectItem value="Empresa C">Empresa C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Filtrar Funcionário</label>
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                {employees.map(emp => (
                  <SelectItem key={emp} value={emp}>{emp}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={filterEvents} className="w-full" variant="outline">
            Aplicar Filtros
          </Button>

          <div className="space-y-2 pt-4 border-t">
            <h4 className="font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4" /> Estatísticas
            </h4>
            <div className="text-sm space-y-1">
              <div>Total Eventos: <Badge>{currentEvents.length}</Badge></div>
              <div>Hoje: <Badge variant="secondary">12</Badge></div>
              <div>Próxima Semana: <Badge variant="outline">45</Badge></div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Building2 className="h-4 w-4" /> Google Calendar
            </h4>
            <Button size="sm" variant="outline" className="w-full">
              <MapPin className="mr-2 h-4 w-4" />
              Conectar Google Calendar
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Adicione sua API Key em .env: GOOGLE_CALENDAR_API_KEY
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Principal */}
      <div className="flex-1 min-h-0">
        <Card className="h-full">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <CardTitle>Calendário {company.name}</CardTitle>
                <p className="text-sm text-muted-foreground">Arraste eventos, clique para detalhes. {currentEvents.length} eventos carregados.</p>
              </div>
              <Select value={selectedView} onValueChange={setSelectedView}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dayGridMonth">Mês</SelectItem>
                  <SelectItem value="timeGridWeek">Semana</SelectItem>
                  <SelectItem value="timeGridDay">Dia</SelectItem>
                  <SelectItem value="listWeek">Lista</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100vh-20rem)]">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
              initialView={selectedView as any}
              events={currentEvents}
              eventClick={handleEventClick}
              dateClick={handleDateClick}
              eventsSet={handleEvents}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
              }}
              height="100%"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={3}
              weekends={true}
              googleCalendarApiKey="YOUR_GOOGLE_CALENDAR_API_KEY" // Placeholder
              eventDisplay="block"
              slotMinTime="08:00:00"
              slotMaxTime="20:00:00"
              ref={calendarRef}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}