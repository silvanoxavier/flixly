"use client";

import CreateInstanceModal from "../modules/channels/evolution/CreateInstanceModal";
import ManageInstanceModal from "../modules/channels/evolution/ManageInstanceModal";

export default function Channels() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Canais</h1>
        <p className="text-muted-foreground">Gerencie instâncias WhatsApp/Evolution.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <CreateInstanceModal />
        <ManageInstanceModal />
      </div>
    </div>
  );
}