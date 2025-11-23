"use client";

import { useOutletContext } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageCircle, FileBarChart, Package } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton<dyad-write path="src/components/ChatNotificationBell.tsx" description="Fixing JSX syntax error caused by corrupted base64 string in audio src and improving type safety.">
"use client";

import { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/lib/supabase';
import { useOutletContext } from 'react-router-dom';

interface CompanyContext {
  company: { id: string; nome_fantasia: string } | null;
}

export default function ChatNotificationBell() {
  const [unreadCount,<dyad-problem-report summary="710 problems">
<problem file="src/pages/Dashboard.tsx" line="31" column="39" code="1005">',' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="44" code="1005">',' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="50" code="1005">',' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="53" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="98" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="101" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="115" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="119" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="125" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="131" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="133" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="140" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="151" code="1005">'(' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="154" code="1005">')' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="178" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="235" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="238" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="256" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="332" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="334" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="344" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="365" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="369" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="376" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="384" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="386" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="489" code="1002">Unterminated string literal.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="1" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="5" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="10" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="16" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="19" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="22" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="33" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="43" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="46" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="50" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="54" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="79" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="90" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="93" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="100" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="104" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="111" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="121" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="35" column="1" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="35" column="7" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="35" column="11" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="35" column="16" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="37" column="4" code="1443">Module declaration names may only use ' or &quot; quoted strings.</problem>
<problem file="src/pages/Dashboard.tsx" line="37" column="30" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="37" column="38" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="37" column="40" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="37" column="65" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="37" column="70" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="37" column="74" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="37" column="80" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="37" column="88" code="2457">Type alias name cannot be 'Company'.</problem>
<problem file="src/pages/Dashboard.tsx" line="39" column="1" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="39" column="4" code="1443">Module declaration names may only use ' or &quot; quoted strings.</problem>
<problem file="src/pages/Dashboard.tsx" line="39" column="28" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="39" column="35" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="39" column="37" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="1" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="4" code="1443">Module declaration names may only use ' or &quot; quoted strings.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="32" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="39" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="55" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="58" code="1435">Unknown keyword or identifier. Did you mean 'declare'?</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="67" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="71" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="88" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="90" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="92" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="99" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="104" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="119" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="43" column="1" code="1435">Unknown keyword or identifier. Did you mean 'from'?</problem>
<problem file="src/pages/Dashboard.tsx" line="43" column="6" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="43" column="29" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="43" column="37" code="1435">Unknown keyword or identifier. Did you mean 'interface'?</problem>
<problem file="src/pages/Dashboard.tsx" line="43" column="48" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="43" column="76" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="1" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="5" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="10" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="18" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="22" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="24" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="33" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="42" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="47" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="53" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="56" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="60" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="70" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="86" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="86" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="116" code="1002">Unterminated string literal.</problem>
<problem file="src/pages/Dashboard.tsx" line="47" column="1" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="47" column="3" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="7" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="31" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="33" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="41" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="45" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="52" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="66" code="1109">Expression expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="71" code="1005">'(' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="73" code="1005">')' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="79" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="85" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="96" code="1005">'(' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="103" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="109" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="112" code="1005">')' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="119" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="125" code="1005">'(' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="51" column="1" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="51" column="10" code="1005">')' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="51" column="41" code="1005">'{' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="53" column="1" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="53" column="10" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="53" column="48" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="53" column="67" code="1005">'=' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="55" column="5" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="55" column="7" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="55" column="13" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="55" column="38" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="55" column="54" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="55" column="64" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="57" column="5" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="4" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="52" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="71" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="75" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="81" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="85" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="88" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="90" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="96" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="102" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="109" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="112" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="116" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="118" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="130" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="61" column="1" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="61" column="3" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="61" column="9" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="61" column="16" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="63" column="1" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="63" column="6" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="63" column="11" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="63" column="15" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="63" column="19" code="1228">A type predicate is only allowed in return type position for functions and methods.</problem>
<problem file="src/pages/Dashboard.tsx" line="65" column="1" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="65" column="4" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="65" column="11" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="65" column="37" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="65" column="52" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="67" column="1" code="1435">Unknown keyword or identifier. Did you mean 'from'?</problem>
<problem file="src/pages/Dashboard.tsx" line="67" column="27" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="67" column="31" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="67" column="44" code="1005">'(' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="69" column="20" code="1005">')' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="69" column="25" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="69" column="28" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="69" column="35" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="71" column="1" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="71" column="13" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="71" column="17" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="71" column="41" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="71" column="49" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="71" column="53" code="1435">Unknown keyword or identifier. Did you mean 'undefined'?</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="7" code="1109">Expression expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="14" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="23" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="44" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="60" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="64" code="1005">'(' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="74" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="78" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="95" code="1005">')' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="100" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="105" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="113" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="75" column="1" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="75" column="8" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="75" column="13" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="75" column="47" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="77" column="1" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="77" column="10" code="1005">'(' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="77" column="19" code="1005">')' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="77" column="50" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="77" column="60" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="1" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="20" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="27" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="31" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="68" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="72" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="75" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="85" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="92" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="107" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="136" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="147" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="81" column="12" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="83" column="18" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="83" column="49" code="1109">Expression expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="85" column="13" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="85" column="19" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="85" column="36" code="1005">'=' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="85" column="41" code="1005">'(' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="85" column="54" code="1005">')' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="85" column="84" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="85" column="96" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="87" column="1" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="87" column="5" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="87" column="11" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="87" column="14" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="87" column="18" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="87" column="34" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="89" column="1" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="89" column="5" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="89" column="11" code="1435">Unknown keyword or identifier. Did you mean 'export'?</problem>
<problem file="src/pages/Dashboard.tsx" line="89" column="18" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="89" column="71" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="1" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="22" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="25" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="29" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="41" code="1435">Unknown keyword or identifier. Did you mean 'declare'?</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="50" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="54" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="70" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="78" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="85" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="90" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="105" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="1" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="9" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="12" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="16" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="57" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="83" code="1005">'{' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="96" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="108" code="1228">A type predicate is only allowed in return type position for functions and methods.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="111" code="1435">Unknown keyword or identifier. Did you mean 'undefined'?</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="119" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="123" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="131" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="135" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="150" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="95" column="1" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="95" column="4" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="95" column="18" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="95" column="39" code="1002">Unterminated string literal.</problem>
<problem file="src/pages/Dashboard.tsx" line="97" column="11" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="97" column="19" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="97" column="26" code="1228">A type predicate is only allowed in return type position for functions and methods.</problem>
<problem file="src/pages/Dashboard.tsx" line="97" column="29" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="97" column="40" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="99" column="1" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="12" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="16" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="24" code="1435">Unknown keyword or identifier. Did you mean 'type'?</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="45" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="50" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="60" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="62" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="66" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="74" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="78" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="90" code="1443">Module declaration names may only use ' or &quot; quoted strings.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="117" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="125" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="129" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="133" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="140" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="147" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="158" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="160" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="175" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="181" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="193" code="1443">Module declaration names may only use ' or &quot; quoted strings.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="217" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="225" code="1005">')' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="243" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="256" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="258" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="266" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="280" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="284" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="288" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="295" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="301" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="303" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="310" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="315" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="319" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="342" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="352" code="1443">Module declaration names may only use ' or &quot; quoted strings.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="368" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="385" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="432" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="436" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="445" code="1443">Module declaration names may only use ' or &quot; quoted strings.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="463" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="465" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="473" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="479" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="482" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="488" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/pages/Dashboard.tsx" line="103" column="1" code="1003">Identifier expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="103" column="13" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="103" column="60" code="1005">';' expected.</problem>
<problem file="src/pages/Dashboard.tsx" line="225" column="2" code="1005">'}' expected.</problem>
<problem file="src/components/ChatNotificationBell.tsx" line="4" column="10" code="6133">'MessageCircle' is declared but its value is never read.</problem>
<problem file="src/components/ChatNotificationBell.tsx" line="93" column="20" code="2349">This expression is not callable.
  Type 'Promise&lt;(() =&gt; void) | undefined&gt;' has no call signatures.</problem>
<problem file="src/layouts/MainLayout.tsx" line="171" column="55" code="2339">Property 'cnpj' does not exist on type 'Company'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="146" code="1101">'with' statements are not allowed in strict mode.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="66" code="1101">'with' statements are not allowed in strict mode.</problem>
<problem file="src/pages/Dashboard.tsx" line="67" column="39" code="1101">'with' statements are not allowed in strict mode.</problem>
<problem file="src/pages/Dashboard.tsx" line="85" column="36" code="1101">'with' statements are not allowed in strict mode.</problem>
<problem file="src/pages/Dashboard.tsx" line="3" column="1" code="6133">'useOutletContext' is declared but its value is never read.</problem>
<problem file="src/pages/Dashboard.tsx" line="4" column="1" code="6133">'useQuery' is declared but its value is never read.</problem>
<problem file="src/pages/Dashboard.tsx" line="5" column="1" code="6133">'supabase' is declared but its value is never read.</problem>
<problem file="src/pages/Dashboard.tsx" line="6" column="1" code="6192">All imports in import declaration are unused.</problem>
<problem file="src/pages/Dashboard.tsx" line="7" column="1" code="6192">All imports in import declaration are unused.</problem>
<problem file="src/pages/Dashboard.tsx" line="8" column="1" code="6133">'Skeleton' is declared but its value is never read.</problem>
<problem file="src/pages/Dashboard.tsx" line="9" column="1" code="6133">'Badge' is declared but its value is never read.</problem>
<problem file="src/pages/Dashboard.tsx" line="11" column="11" code="6196">'Company' is declared but never used.</problem>
<problem file="src/pages/Dashboard.tsx" line="18" column="11" code="6196">'Stats' is declared but never used.</problem>
<problem file="src/pages/Dashboard.tsx" line="29" column="9" code="6133">'companyId' is declared but its value is never read.</problem>
<problem file="src/pages/Dashboard.tsx" line="29" column="30" code="2339">Property 'id' does not exist on type 'Company'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="9" code="6133">'clientesAssistant' is declared but its value is never read.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="28" code="2304">Cannot find name 'First'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="35" code="7005">Variable 'the' implicitly has an 'any' type.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="39" code="7005">Variable 'main' implicitly has an 'any' type.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="44" code="7005">Variable 'error' implicitly has an 'any' type.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="50" code="7005">Variable 'is' implicitly has an 'any' type.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="56" code="2322">Type 'string' is not assignable to type 'object'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="98" code="2304">Cannot find name 'at'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="101" code="2304">Cannot find name 'line'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="115" code="2552">Cannot find name 'The'. Did you mean 'the'?</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="125" code="2304">Cannot find name 'shows'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="131" code="2304">Cannot find name 'a'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="133" code="2304">Cannot find name 'syntax'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="140" code="2552">Cannot find name 'issue'. Did you mean 'issues'?</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="151" code="2708">Cannot use namespace 'JSX' as a value.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="178" code="2304">Cannot find name 'and'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="227" code="2339">Property 'Looking' does not exist on type '&quot;Unexpected token `numeric literal (4, 4)`&quot;'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="235" code="2304">Cannot find name 'at'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="242" code="2304">Cannot find name 'snippet'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="242" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="251" code="2304">Cannot find name 'there'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="332" code="2304">Cannot find name 's'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="334" code="2304">Cannot find name 'truncated'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="344" code="2304">Cannot find name 'and'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="348" code="2304">Cannot find name 'invalid'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="348" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="357" code="2304">Cannot find name 'causing'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="369" code="2304">Cannot find name 'parser'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="376" code="2304">Cannot find name 'to'.</problem>
<problem file="src/pages/Dashboard.tsx" line="31" column="386" code="2304">Cannot find name 'It'.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="1" code="2304">Cannot find name 'The'.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="5" code="2304">Cannot find name 'file'.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="10" code="2304">Cannot find name 'needs'.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="16" code="2304">Cannot find name 'to'.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="19" code="2304">Cannot find name 'be'.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="22" code="2304">Cannot find name 'completely'.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="33" code="2304">Cannot find name 'rewritten'.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="43" code="2304">Cannot find name 'to'.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="46" code="2304">Cannot find name 'fix'.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="54" code="2708">Cannot use namespace 'JSX' as a value.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="58" code="2304">Cannot find name 'syntax'.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="58" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="66" code="2304">Cannot find name 'specifically'.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="79" code="2304">Cannot find name 'shortening'.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="90" code="2304">Cannot find name 'or'.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="93" code="2304">Cannot find name 'fixing'.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="104" code="2304">Cannot find name 'base64'.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="111" code="2304">Cannot find name 'audio'.</problem>
<problem file="src/pages/Dashboard.tsx" line="33" column="117" code="2304">Cannot find name 'src'.</problem>
<problem file="src/pages/Dashboard.tsx" line="35" column="1" code="2304">Cannot find name 'There'.</problem>
<problem file="src/pages/Dashboard.tsx" line="35" column="7" code="2304">Cannot find name 'are'.</problem>
<problem file="src/pages/Dashboard.tsx" line="35" column="11" code="2304">Cannot find name 'also'.</problem>
<problem file="src/pages/Dashboard.tsx" line="35" column="16" code="2304">Cannot find name 'TypeScript'.</problem>
<problem file="src/pages/Dashboard.tsx" line="37" column="1" code="2349">This expression is not callable.
  Type 'Number' has no call signatures.</problem>
<problem file="src/pages/Dashboard.tsx" line="37" column="30" code="2304">Cannot find name 'line'.</problem>
<problem file="src/pages/Dashboard.tsx" line="37" column="40" code="2304">Cannot find name 'Property'.</problem>
<problem file="src/pages/Dashboard.tsx" line="37" column="65" code="2304">Cannot find name 'does'.</problem>
<problem file="src/pages/Dashboard.tsx" line="37" column="70" code="2304">Cannot find name 'not'.</problem>
<problem file="src/pages/Dashboard.tsx" line="37" column="74" code="2304">Cannot find name 'exist'.</problem>
<problem file="src/pages/Dashboard.tsx" line="37" column="80" code="2304">Cannot find name 'on'.</problem>
<problem file="src/pages/Dashboard.tsx" line="37" column="83" code="2304">Cannot find name 'type'.</problem>
<problem file="src/pages/Dashboard.tsx" line="39" column="1" code="2349">This expression is not callable.
  Type 'Number' has no call signatures.</problem>
<problem file="src/pages/Dashboard.tsx" line="39" column="28" code="2304">Cannot find name 'line'.</problem>
<problem file="src/pages/Dashboard.tsx" line="39" column="37" code="2304">Cannot find name 'Same'.</problem>
<problem file="src/pages/Dashboard.tsx" line="39" column="42" code="2304">Cannot find name 'issue'.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="1" code="2349">This expression is not callable.
  Type 'Number' has no call signatures.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="32" code="2304">Cannot find name 'line'.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="58" code="2304">Cannot find name 'declared'.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="67" code="2304">Cannot find name 'but'.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="71" code="2693">'never' only refers to a type, but is being used as a value here.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="77" code="2304">Cannot find name 'used'.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="92" code="2304">Cannot find name 'Cannot'.</problem>
<problem file="src/pages/Dashboard.tsx" line="41" column="99" code="2304">Cannot find name 'find'.</problem>
<problem file="src/pages/Dashboard.tsx" line="43" column="1" code="2304">Cannot find name 'From'.</problem>
<problem file="src/pages/Dashboard.tsx" line="43" column="6" code="2304">Cannot find name 'previous'.</problem>
<problem file="src/pages/Dashboard.tsx" line="43" column="15" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="43" column="24" code="2304">Cannot find name 'some'.</problem>
<problem file="src/pages/Dashboard.tsx" line="43" column="37" code="2304">Cannot find name 'interfaces'.</problem>
<problem file="src/pages/Dashboard.tsx" line="43" column="48" code="2304">Cannot find name 'are'.</problem>
<problem file="src/pages/Dashboard.tsx" line="43" column="52" code="2304">Cannot find name 'missing'.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="1" code="2304">Cannot find name 'The'.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="5" code="2304">Cannot find name 'user'.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="10" code="2304">Cannot find name 'message'.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="18" code="2304">Cannot find name 'has'.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="22" code="2304">Cannot find name 'a'.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="24" code="2304">Cannot find name 'previous'.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="33" code="2304">Cannot find name 'response'.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="42" code="2304">Cannot find name 'that'.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="47" code="2304">Cannot find name 'tried'.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="53" code="2304">Cannot find name 'to'.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="56" code="2304">Cannot find name 'fix'.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="70" code="2304">Cannot find name 'and'.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="74" code="2304">Cannot find name 'others'.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="74" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="82" code="2304">Cannot find name 'but'.</problem>
<problem file="src/pages/Dashboard.tsx" line="45" column="86" code="2582">Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.</problem>
<problem file="src/pages/Dashboard.tsx" line="47" column="1" code="2304">Cannot find name 'I'.</problem>
<problem file="src/pages/Dashboard.tsx" line="47" column="3" code="2304">Cannot find name 'need'.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="3" code="2304">Cannot find name 'Fix'.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="28" code="2339">Property 'tsx' does not exist on type '() =&gt; Element | null'.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="33" code="2304">Cannot find name 'Rewrite'.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="45" code="2304">Cannot find name 'entire'.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="52" code="2304">Cannot find name 'file'.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="57" code="2304">Cannot find name 'cleanly'.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="57" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="71" code="2304">Cannot find name 'a'.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="79" code="2304">Cannot find name 'short'.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="85" code="2304">Cannot find name 'base64'.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="96" code="2304">Cannot find name 'silent'.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="103" code="2304">Cannot find name 'audio'.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="109" code="2304">Cannot find name 'or'.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="112" code="2304">Cannot find name 'remove'.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="119" code="2582">Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.</problem>
<problem file="src/pages/Dashboard.tsx" line="49" column="125" code="2304">Cannot find name 'unnecessary'.</problem>
<problem file="src/pages/Dashboard.tsx" line="51" column="3" code="2304">Cannot find name 'Ensure'.</problem>
<problem file="src/pages/Dashboard.tsx" line="51" column="41" code="2304">Cannot find name 'has'.</problem>
<problem file="src/pages/Dashboard.tsx" line="51" column="82" code="2339">Property 'tsx' does not exist on type '() =&gt; void'.</problem>
<problem file="src/pages/Dashboard.tsx" line="51" column="87" code="2304">Cannot find name 'Catalog'.</problem>
<problem file="src/pages/Dashboard.tsx" line="51" column="100" code="2304">Cannot find name 'Agendamento'.</problem>
<problem file="src/pages/Dashboard.tsx" line="51" column="117" code="2304">Cannot find name 'Kanban'.</problem>
<problem file="src/pages/Dashboard.tsx" line="51" column="129" code="2304">Cannot find name 'etc'.</problem>
<problem file="src/pages/Dashboard.tsx" line="53" column="3" code="2304">Cannot find name 'Remove'.</problem>
<problem file="src/pages/Dashboard.tsx" line="53" column="10" code="2304">Cannot find name 'unused'.</problem>
<problem file="src/pages/Dashboard.tsx" line="53" column="17" code="2304">Cannot find name 'ContextType'.</problem>
<problem file="src/pages/Dashboard.tsx" line="53" column="32" code="2304">Cannot find name 'Agendamento'.</problem>
<problem file="src/pages/Dashboard.tsx" line="53" column="48" code="2304">Cannot find name 'and'.</problem>
<problem file="src/pages/Dashboard.tsx" line="53" column="67" code="2304">Cannot find name 'properly'.</problem>
<problem file="src/pages/Dashboard.tsx" line="53" column="67" code="2503">Cannot find namespace 'properly'.</problem>
<problem file="src/pages/Dashboard.tsx" line="55" column="7" code="2304">Cannot find name 'there'.</problem>
<problem file="src/pages/Dashboard.tsx" line="55" column="13" code="2304">Cannot find name 'are'.</problem>
<problem file="src/pages/Dashboard.tsx" line="55" column="17" code="2304">Cannot find name 'dyad'.</problem>
<problem file="src/pages/Dashboard.tsx" line="55" column="22" code="2304">Cannot find name 'problem'.</problem>
<problem file="src/pages/Dashboard.tsx" line="55" column="30" code="2304">Cannot find name 'reports'.</problem>
<problem file="src/pages/Dashboard.tsx" line="55" column="38" code="2304">Cannot find name 'embedded'.</problem>
<problem file="src/pages/Dashboard.tsx" line="55" column="38" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="55" column="48" code="2304">Cannot find name 'which'.</problem>
<problem file="src/pages/Dashboard.tsx" line="55" column="54" code="2304">Cannot find name 'corrupted'.</problem>
<problem file="src/pages/Dashboard.tsx" line="55" column="68" code="2304">Cannot find name 'file'.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="4" code="2304">Cannot find name 'Rewrite'.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="12" code="2304">Cannot find name 'src'.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="16" code="2304">Cannot find name 'components'.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="48" code="2339">Property 'tsx' does not exist on type '() =&gt; Element | null'.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="52" code="2304">Cannot find name 'completely'.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="52" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="64" code="2304">Cannot find name 'fixing'.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="75" code="2304">Cannot find name 'audio'.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="81" code="2304">Cannot find name 'src'.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="85" code="2304">Cannot find name 'to'.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="88" code="2304">Cannot find name 'a'.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="90" code="2304">Cannot find name 'short'.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="96" code="2304">Cannot find name 'valid'.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="102" code="2304">Cannot find name 'base64'.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="109" code="2304">Cannot find name 'or'.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="112" code="2304">Cannot find name 'use'.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="116" code="2304">Cannot find name 'a'.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="118" code="2304">Cannot find name 'simple'.</problem>
<problem file="src/pages/Dashboard.tsx" line="59" column="125" code="2304">Cannot find name 'beep'.</problem>
<problem file="src/pages/Dashboard.tsx" line="61" column="1" code="2304">Cannot find name 'A'.</problem>
<problem file="src/pages/Dashboard.tsx" line="61" column="3" code="2304">Cannot find name 'short'.</problem>
<problem file="src/pages/Dashboard.tsx" line="61" column="9" code="2304">Cannot find name 'silent'.</problem>
<problem file="src/pages/Dashboard.tsx" line="61" column="16" code="2304">Cannot find name 'WAV'.</problem>
<problem file="src/pages/Dashboard.tsx" line="63" column="1" code="2304">Cannot find name 'Make'.</problem>
<problem file="src/pages/Dashboard.tsx" line="63" column="6" code="2304">Cannot find name 'sure'.</problem>
<problem file="src/pages/Dashboard.tsx" line="63" column="15" code="2708">Cannot use namespace 'JSX' as a value.</problem>
<problem file="src/pages/Dashboard.tsx" line="63" column="22" code="2304">Cannot find name 'proper'.</problem>
<problem file="src/pages/Dashboard.tsx" line="65" column="4" code="2304">Cannot find name 'Update'.</problem>
<problem file="src/pages/Dashboard.tsx" line="65" column="19" code="2304">Cannot find name 'interfaces'.</problem>
<problem file="src/pages/Dashboard.tsx" line="65" column="37" code="2304">Cannot find name 'affected'.</problem>
<problem file="src/pages/Dashboard.tsx" line="65" column="46" code="2304">Cannot find name 'pages'.</problem>
<problem file="src/pages/Dashboard.tsx" line="67" column="1" code="2304">Cannot find name 'From'.</problem>
<problem file="src/pages/Dashboard.tsx" line="67" column="6" code="2304">Cannot find name 'codebase'.</problem>
<problem file="src/pages/Dashboard.tsx" line="67" column="6" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="67" column="16" code="2304">Cannot find name 'MainLayout'.</problem>
<problem file="src/pages/Dashboard.tsx" line="67" column="27" code="2304">Cannot find name 'has'.</problem>
<problem file="src/pages/Dashboard.tsx" line="67" column="44" code="2304">Cannot find name 'nome_fantasia'.</problem>
<problem file="src/pages/Dashboard.tsx" line="69" column="12" code="2304">Cannot find name 'Catalog'.</problem>
<problem file="src/pages/Dashboard.tsx" line="69" column="25" code="2304">Cannot find name 'to'.</problem>
<problem file="src/pages/Dashboard.tsx" line="69" column="28" code="2304">Cannot find name 'add'.</problem>
<problem file="src/pages/Dashboard.tsx" line="69" column="32" code="2582">Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.</problem>
<problem file="src/pages/Dashboard.tsx" line="71" column="1" code="2304">Cannot find name 'Agendamento'.</problem>
<problem file="src/pages/Dashboard.tsx" line="71" column="13" code="2304">Cannot find name 'has'.</problem>
<problem file="src/pages/Dashboard.tsx" line="71" column="17" code="2304">Cannot find name 'ContextType'.</problem>
<problem file="src/pages/Dashboard.tsx" line="71" column="29" code="2304">Cannot find name 'unused'.</problem>
<problem file="src/pages/Dashboard.tsx" line="71" column="29" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="71" column="37" code="2304">Cannot find name 'and'.</problem>
<problem file="src/pages/Dashboard.tsx" line="71" column="49" code="2304">Cannot find name 'not'.</problem>
<problem file="src/pages/Dashboard.tsx" line="71" column="53" code="2304">Cannot find name 'defined'.</problem>
<problem file="src/pages/Dashboard.tsx" line="71" column="61" code="2304">Cannot find name 'properly'.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="14" code="2304">Cannot find name 'previous'.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="23" code="2304">Cannot find name 'human'.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="29" code="2304">Cannot find name 'message'.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="29" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="38" code="2304">Cannot find name 'there'.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="44" code="2304">Cannot find name 'are'.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="48" code="2304">Cannot find name 'dyad'.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="53" code="2304">Cannot find name 'writes'.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="74" code="2304">Cannot find name 'and'.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="78" code="2304">Cannot find name 'Agendamento'.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="78" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="91" code="2304">Cannot find name 'but'.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="95" code="2304">Cannot find name 'they'.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="100" code="2304">Cannot find name 'seem'.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="105" code="2304">Cannot find name 'cut'.</problem>
<problem file="src/pages/Dashboard.tsx" line="73" column="109" code="2304">Cannot find name 'off'.</problem>
<problem file="src/pages/Dashboard.tsx" line="75" column="1" code="2304">Cannot find name 'Output'.</problem>
<problem file="src/pages/Dashboard.tsx" line="75" column="8" code="2304">Cannot find name 'only'.</problem>
<problem file="src/pages/Dashboard.tsx" line="75" column="17" code="2304">Cannot find name 'necessary'.</problem>
<problem file="src/pages/Dashboard.tsx" line="75" column="28" code="2304">Cannot find name 'dyad'.</problem>
<problem file="src/pages/Dashboard.tsx" line="75" column="33" code="2304">Cannot find name 'write'.</problem>
<problem file="src/pages/Dashboard.tsx" line="75" column="40" code="2304">Cannot find name 'blocks'.</problem>
<problem file="src/pages/Dashboard.tsx" line="77" column="1" code="2304">Cannot find name 'Check'.</problem>
<problem file="src/pages/Dashboard.tsx" line="77" column="10" code="2304">Cannot find name 'features'.</problem>
<problem file="src/pages/Dashboard.tsx" line="77" column="19" code="2304">Cannot find name 'already'.</problem>
<problem file="src/pages/Dashboard.tsx" line="77" column="40" code="2304">Cannot find name 'No'.</problem>
<problem file="src/pages/Dashboard.tsx" line="77" column="40" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="77" column="44" code="2304">Cannot find name 'these'.</problem>
<problem file="src/pages/Dashboard.tsx" line="77" column="50" code="2304">Cannot find name 'are'.</problem>
<problem file="src/pages/Dashboard.tsx" line="77" column="54" code="2304">Cannot find name 'fixes'.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="1" code="2304">Cannot find name 'Brief'.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="20" code="2304">Cannot find name 'Fixing'.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="27" code="2708">Cannot use namespace 'JSX' as a value.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="31" code="2304">Cannot find name 'syntax'.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="68" code="2304">Cannot find name 'due'.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="72" code="2304">Cannot find name 'to'.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="75" code="2304">Cannot find name 'corrupted'.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="85" code="2304">Cannot find name 'base64'.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="92" code="2304">Cannot find name 'audio'.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="98" code="2304">Cannot find name 'src'.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="98" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="103" code="2304">Cannot find name 'and'.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="107" code="2304">Cannot find name 'TypeScript'.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="118" code="2304">Cannot find name 'errors'.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="136" code="2304">Cannot find name 'interfaces'.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="147" code="2304">Cannot find name 'across'.</problem>
<problem file="src/pages/Dashboard.tsx" line="79" column="154" code="2304">Cannot find name 'pages'.</problem>
<problem file="src/pages/Dashboard.tsx" line="81" column="7" code="2304">Cannot find name 'code'.</problem>
<problem file="src/pages/Dashboard.tsx" line="81" column="12" code="2304">Cannot find name 'changes'.</problem>
<problem file="src/pages/Dashboard.tsx" line="83" column="10" code="2304">Cannot find name 'concise'.</problem>
<problem file="src/pages/Dashboard.tsx" line="83" column="18" code="2304">Cannot find name 'summary'.</problem>
<problem file="src/pages/Dashboard.tsx" line="83" column="26" code="2304">Cannot find name 'and'.</problem>
<problem file="src/pages/Dashboard.tsx" line="83" column="31" code="2304">Cannot find name 'dyad'.</problem>
<problem file="src/pages/Dashboard.tsx" line="83" column="36" code="2304">Cannot find name 'chat'.</problem>
<problem file="src/pages/Dashboard.tsx" line="83" column="41" code="2304">Cannot find name 'summary'.</problem>
<problem file="src/pages/Dashboard.tsx" line="85" column="7" code="2304">Cannot find name 'there'.</problem>
<problem file="src/pages/Dashboard.tsx" line="85" column="13" code="2304">Cannot find name 'might'.</problem>
<problem file="src/pages/Dashboard.tsx" line="85" column="19" code="2304">Cannot find name 'be'.</problem>
<problem file="src/pages/Dashboard.tsx" line="85" column="41" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="85" column="43" code="2304">Cannot find name 'alias'.</problem>
<problem file="src/pages/Dashboard.tsx" line="85" column="50" code="2304">Cannot find name 'but'.</problem>
<problem file="src/pages/Dashboard.tsx" line="85" column="59" code="2304">Cannot find name 'docs'.</problem>
<problem file="src/pages/Dashboard.tsx" line="85" column="64" code="2304">Cannot find name 'errors'.</problem>
<problem file="src/pages/Dashboard.tsx" line="85" column="75" code="2304">Cannot find name 'tsconfig'.</problem>
<problem file="src/pages/Dashboard.tsx" line="85" column="84" code="2304">Cannot find name 'needs'.</problem>
<problem file="src/pages/Dashboard.tsx" line="85" column="90" code="2304">Cannot find name 'paths'.</problem>
<problem file="src/pages/Dashboard.tsx" line="87" column="1" code="2304">Cannot find name 'But'.</problem>
<problem file="src/pages/Dashboard.tsx" line="87" column="11" code="2304">Cannot find name 'on'.</problem>
<problem file="src/pages/Dashboard.tsx" line="87" column="18" code="2304">Cannot find name 'reported'.</problem>
<problem file="src/pages/Dashboard.tsx" line="87" column="27" code="2304">Cannot find name 'errors'.</problem>
<problem file="src/pages/Dashboard.tsx" line="89" column="1" code="2304">Cannot find name 'The'.</problem>
<problem file="src/pages/Dashboard.tsx" line="89" column="11" code="2304">Cannot find name 'report'.</problem>
<problem file="src/pages/Dashboard.tsx" line="89" column="18" code="2304">Cannot find name 'mentions'.</problem>
<problem file="src/pages/Dashboard.tsx" line="89" column="27" code="2304">Cannot find name 'problems'.</problem>
<problem file="src/pages/Dashboard.tsx" line="89" column="27" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="89" column="27" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="89" column="50" code="2304">Cannot find name 'Catalog'.</problem>
<problem file="src/pages/Dashboard.tsx" line="89" column="59" code="2304">Cannot find name 'Agendamento'.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="1" code="2304">Cannot find name 'In'.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="4" code="2304">Cannot find name 'Agendamento'.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="4" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="17" code="2304">Cannot find name 'line'.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="25" code="2304">Cannot find name 'has'.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="29" code="2304">Cannot find name 'ContextType'.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="41" code="2304">Cannot find name 'declared'.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="50" code="2304">Cannot find name 'but'.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="54" code="2693">'never' only refers to a type, but is being used as a value here.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="60" code="2304">Cannot find name 'used'.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="60" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="66" code="2304">Cannot find name 'and'.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="70" code="2304">Cannot find name 'line'.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="78" code="2304">Cannot find name 'Cannot'.</problem>
<problem file="src/pages/Dashboard.tsx" line="91" column="85" code="2304">Cannot find name 'find'.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="1" code="2304">Cannot find name 'Looking'.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="9" code="2304">Cannot find name 'at'.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="16" code="2304">Cannot find name 'provided'.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="25" code="2304">Cannot find name 'Agendamento'.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="44" code="2304">Cannot find name 'codebase'.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="54" code="2582">Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="57" code="2304">Cannot find name 'defines'.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="83" code="2304">Cannot find name 'locally'.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="83" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="92" code="2304">Cannot find name 'but'.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="96" code="2304">Cannot find name 'ContextType'.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="111" code="2304">Cannot find name 'defined'.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="119" code="2304">Cannot find name 'but'.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="123" code="2304">Cannot find name 'perhaps'.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="131" code="2304">Cannot find name 'not'.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="135" code="2304">Cannot find name 'used'.</problem>
<problem file="src/pages/Dashboard.tsx" line="93" column="140" code="2304">Cannot find name 'correctly'.</problem>
<problem file="src/pages/Dashboard.tsx" line="95" column="1" code="2304">Cannot find name 'In'.</problem>
<problem file="src/pages/Dashboard.tsx" line="95" column="8" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="95" column="16" code="2582">Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.</problem>
<problem file="src/pages/Dashboard.tsx" line="97" column="1" code="2304">Cannot find name 'Also'.</problem>
<problem file="src/pages/Dashboard.tsx" line="97" column="1" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="97" column="11" code="2304">Cannot find name 'massive'.</problem>
<problem file="src/pages/Dashboard.tsx" line="97" column="19" code="2304">Cannot find name 'base64'.</problem>
<problem file="src/pages/Dashboard.tsx" line="97" column="33" code="2304">Cannot find name 'killer'.</problem>
<problem file="src/pages/Dashboard.tsx" line="99" column="1" code="2304">Cannot find name 'Primary'.</problem>
<problem file="src/pages/Dashboard.tsx" line="99" column="35" code="2339">Property 'tsx' does not exist on type '() =&gt; Element | null'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="12" code="2304">Cannot find name 'Fix'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="24" code="2304">Cannot find name 'types'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="30" code="2693">'consistently' only refers to a type, but is being used as a value here.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="45" code="2304">Cannot find name 'erro'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="50" code="2304">Cannot find name 'principal'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="60" code="2304">Cannot find name 'é'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="62" code="2304">Cannot find name 'uma'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="66" code="2304">Cannot find name 'sintaxe'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="74" code="2708">Cannot use namespace 'JSX' as a value.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="78" code="2304">Cannot find name 'inválida'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="87" code="2304">Cannot find name 'no'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="117" code="2304">Cannot find name 'causada'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="125" code="2304">Cannot find name 'por'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="129" code="2304">Cannot find name 'uma'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="133" code="2693">'string' only refers to a type, but is being used as a value here.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="140" code="2304">Cannot find name 'base64'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="147" code="2304">Cannot find name 'corrompida'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="158" code="2304">Cannot find name 'e'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="160" code="2304">Cannot find name 'excessivamente'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="175" code="2304">Cannot find name 'longa'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="181" code="2304">Cannot find name 'no'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="184" code="2304">Cannot find name 'atributo'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="202" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="213" code="2304">Cannot find name 'que'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="217" code="2304">Cannot find name 'quebrou'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="225" code="2304">Cannot find name 'o'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="227" code="2304">Cannot find name 'parser'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="243" code="2304">Cannot find name 'reescrevendo'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="256" code="2304">Cannot find name 'o'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="258" code="2304">Cannot find name 'arquivo'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="266" code="2304">Cannot find name 'completamente'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="280" code="2304">Cannot find name 'com'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="284" code="2304">Cannot find name 'uma'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="288" code="2304">Cannot find name 'base64'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="295" code="2304">Cannot find name 'curta'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="301" code="2304">Cannot find name 'e'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="303" code="2304">Cannot find name 'válida'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="310" code="2304">Cannot find name 'para'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="315" code="2304">Cannot find name 'som'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="319" code="2304">Cannot find name 'de'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="322" code="2304">Cannot find name 'notificação'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="342" code="2304">Cannot find name 'adicionei'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="368" code="2304">Cannot find name 'consistentemente'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="385" code="2304">Cannot find name 'nas'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="389" code="2304">Cannot find name 'interfaces'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="389" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="411" code="2304">Cannot find name 'removi'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="432" code="2304">Cannot find name 'não'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="436" code="2304">Cannot find name 'usado'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="442" code="2304">Cannot find name 'em'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="463" code="2304">Cannot find name 'e'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="465" code="2304">Cannot find name 'corrigi'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="473" code="2304">Cannot find name 'todos'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="479" code="2304">Cannot find name 'os'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="482" code="2304">Cannot find name 'tipos'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="488" code="2304">Cannot find name 'TS'.</problem>
<problem file="src/pages/Dashboard.tsx" line="101" column="491" code="2304">Cannot find name 'reportados'.</problem>
<problem file="src/pages/Dashboard.tsx" line="103" column="2" code="2304">Cannot find name 'dyad'.</problem>
<problem file="src/pages/Dashboard.tsx" line="103" column="7" code="2304">Cannot find name 'write'.</problem>
<problem file="src/pages/Dashboard.tsx" line="103" column="13" code="2304">Cannot find name 'path'.</problem>
<problem file="src/pages/Dashboard.tsx" line="103" column="60" code="2304">Cannot find name 'description'.</problem>
<problem file="src/pages/Dashboard.tsx" line="106" column="45" code="2307">Cannot find module 'react' or its corresponding type declarations.</problem>
<problem file="src/pages/Dashboard.tsx" line="127" column="37" code="7006">Parameter 'e' implicitly has an 'any' type.</problem>
<problem file="src/pages/Dashboard.tsx" line="198" column="9" code="2349">This expression is not callable.
  Type 'Promise&lt;(() =&gt; void) | undefined&gt;' has no call signatures.</problem>
<problem file="src/App.tsx" line="39" column="38" code="2786">'Dashboard' cannot be used as a JSX component.
  Its type '() =&gt; void' is not a valid JSX element type.
    Type '() =&gt; void' is not assignable to type '(props: any, deprecatedLegacyContext?: any) =&gt; ReactNode'.
      Type 'void' is not assignable to type 'ReactNode'.</problem>
</dyad-problem-report><think>[REDACTED]</think><dyad-write path="src/components/ChatNotificationBell.tsx" description="Clean rewrite fixing JSX syntax (invalid base64), type safety, and useEffect cleanup.">
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Bell } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/lib/supabase';
import { useOutletContext } from 'react-router-dom';

interface CompanyContext {
  company: { id: string; nome_fantasia: string } | null;
}

export default function ChatNotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const context = useOutletContext<CompanyContext | null>();
  const company = context?.company;

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
    }
  };

  const fetchUnreadCount = useCallback(async (conversationIds: string[]) => {
    if (conversationIds.length === 0 || !company?.id) {
      setUnreadCount(0);
      return;
    }
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .in('conversation_id', conversationIds)
      .is('read_at', null)
      .neq('sender_type', 'bot')
      .eq('company_id', company.id);

    if (!error && count !== null) {
      setUnreadCount(count);
    }
  }, [company?.id]);

  useEffect(() => {
    if (!company?.id) {
      setUnreadCount(0);
      return;
    }

    let conversationIds: string[] = [];
    let channel: any = null;

    const setupSubscription = async () => {
      const { data: conversations, error: convError } = await supabase
        .from('conversations')
        .select('id')
        .eq('company_id', company.id);

      if (convError || !conversations) {
        console.error("Error fetching conversations:", convError);
        return;
      }
      
      conversationIds = conversations.map((c: any) => c.id);
      await fetchUnreadCount(conversationIds);

      channel = supabase
        .channel(`chat-messages-${company.id}`)
        .on('postgres_changes', 
          { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'messages',
            filter: `company_id=eq.${company.id}`
          },
          (payload: any) => {
            if (payload.new && !payload.new.read_at && payload.new.sender_type !== 'bot') {
              playNotificationSound();
              fetchUnreadCount(conversationIds);
            }
          }
        )
        .subscribe();
    };

    setupSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [company, fetchUnreadCount]);

  if (!company) {
    return null;
  }

  return (
    <>
      <audio 
        ref={audioRef} 
        preload="auto" 
        src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhIk8AAA==" 
      />
      <div className="relative p-1.5 cursor-pointer hover:bg-accent rounded-full transition-colors">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs rounded-full bg-destructive">
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </div>
    </>
  );
}