"use client";

import { useState, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

// Importa o objeto de locale diretamente, se disponível
// Se o erro persistir, pode ser necessário instalar @fullcalendar/core/locales-all
// ou verificar a configuração do Vite para alias de módulos.
import * as allLocales from '@fullcalendar/core/locales-all';

// --- Mock Data ---
interface Resource {
  id: string;
  title: string;
  color: string;
}

const resources: Resource[] = [
  { id: 'r1', title: 'Vendedor A', color: '#3b82f6' }, // blue
  { id: 'r2', title: 'Vendedor B', color: '#10b981' }, // green
  { id: 'r3', title: 'Suporte', color: '#f59e0b' }, // amber
];

const initialEvents = [
  { id: '1', title: 'Reunião Cliente X', start: '2024-10-20T10:00:00', end: '2024-10-20T12:00:00', resourceId: 'r1', color: resources[0].color },
  { id: '2', title: 'Follow-up Y', start: '2024-10-21T14:00:00', end: '2024-10-21T15:30:00', resourceId: 'r2', color: resources[1].color },
  { id: '3', title: 'Treinamento Interno', start: '2024-10-22T09:00:00', end: '2024-10-22T11:00:00', resourceId: 'r3', color: resources[2].color },
  { id: '4', title: 'Demo Produto', start: '2024-10-23T16:00:00', end: '2024-10-23T17:00:00', resourceId: 'r1', color: resources[0].color },
];

// --- Componente Principal ---
export default function Agendamento() {
  const [events, setEvents] = useState(initialEvents);
  const [activeResources, setActiveResources] = useState<string[]>(resources.map(r => r.id));

  // Encontra o locale pt-br no objeto de todos os locales
  // allLocales pode exportar um objeto com uma propriedade 'default' que contém os locales
  const ptBrLocale = (allLocales as any).default.find((locale: { code: string; }) => locale.code === 'pt-br');

  // Adiciona um console.log para verificar se o locale foi encontrado
  console.log("Locale pt-br carregado:", ptBrLocale);

  const filteredEvents = events.filter(event => activeResources.includes(event.resourceId));

  const handleResourceToggle = useCallback((resourceId: string, checked: boolean) => {
    setActiveResources(prev => 
      checked ? [...prev, resourceId] : prev.filter(id => id !== resourceId)
    );
  }, []);

  const handleEventDrop = (info: any) => {
    // Lógica para atualizar o evento no backend/estado
    console.log('Evento movido:', info.event.title, 'para:', info.event.start);
    // Aqui você faria uma chamada API para persistir a mudança
  };

  const handleDateSelect = (selectInfo: any) => {
    const title = prompt('Por favor, insira um novo título para o seu evento');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    if (title) {
      const newEvent = {
        id: String(Date.now()),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        resourceId: resources[0].id, // Default to first resource
        color: resources[0].color,
      };
      setEvents(prev => [...prev, newEvent]);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <CalendarIcon className="h-7 w-7 text-primary" /> Agendamento
        </h1>
        <p className="text-muted-foreground">Gerencie compromissos e a disponibilidade da equipe.</p>
      </div>

      <PanelGroup direction="horizontal" className="flex-1 min-h-[600px] border rounded-xl overflow-hidden bg-card">
        
        {/* Sidebar de Filtros/Recursos */}
        <Panel defaultSize={20} minSize={15} maxSize={30} className="p-4 flex flex-col">
          <div className="p-0 pb-4">
            <h2 className="text-lg font-semibold">Recursos (Equipe)</h2>
          </div>
          <div className="p-0 space-y-3 flex-1 overflow-y-auto">
            {resources.map((resource) => (
              <div key={resource.id} className="flex items-center space-x-2">
                <Checkbox
                  id={resource.id}
                  checked={activeResources.includes(resource.id)}
                  onCheckedChange={(checked) => handleResourceToggle(resource.id, !!checked)}
                  style={{ borderColor: resource.color, backgroundColor: activeResources.includes(resource.id) ? resource.color : 'transparent' }}
                />
                <Label htmlFor={resource.id} className="flex items-center gap-2 cursor-pointer">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: resource.color }}></span>
                  {resource.title}
                </Label>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t mt-4">
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Novo Evento
            </Button>
          </div>
        </Panel>

        <PanelResizeHandle />

        {/* Calendário Principal */}
        <Panel defaultSize={80} minSize={50} className="p-4 bg-background/50">
          <div className="shadow-lg rounded-lg h-full">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
              initialView="timeGridWeek"
              locale={ptBrLocale} // Usando o objeto locale encontrado
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
              }}
              buttonText={{
                today: 'Hoje',
                month: 'Mês',
                week: 'Semana',
                day: 'Dia',
                list: 'Lista',
              }}
              events={filteredEvents}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              slotMinTime="08:00:00"
              slotMaxTime="20:00:00"
              allDaySlot={false}
              
              // Interações
              eventDrop={handleEventDrop}
              select={handleDateSelect}
              eventClick={(clickInfo) => {
                if (confirm(`Deseja deletar o evento '${clickInfo.event.title}'?`)) {
                  clickInfo.event.remove();
                  setEvents(prev => prev.filter(e => e.id !== clickInfo.event.id));
                }
              }}
              
              // Estilização
              height="100%"
              contentHeight="auto"
            />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}