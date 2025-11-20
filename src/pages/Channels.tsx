"use client";

import { Button } from "@/components/ui/button";
import CreateInstanceModal from "~/modules/channels/evolution/CreateInstanceModal";
import ManageInstanceModal from "~/modules/channels/evolution/ManageInstanceModal";

const Channels = () => (
  <div className="space-y-6">
    <div className="flex space-x-4">
      <Button>WhatsApp</Button>
      <Button>Webchat</Button>
    </div>
    <CreateInstanceModal />
    <ManageInstanceModal />
  </div>
);

export default Channels;