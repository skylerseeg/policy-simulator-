/*
========================================
File: src/features/simulator/SimulatorPage.tsx
========================================
Purpose: The main page component that assembles the simulator.
*/
import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { BookOpen, Scale, ShieldCheck, Zap, TrendingUp, Users, FileText } from 'lucide-react';

import Card from '../../components/Card';
import IconHeader from '../../components/IconHeader';
import PolicyOption from '../../components/PolicyOption';
import WhitepaperModal from '../../components/WhitepaperModal';
import { runSimulationLogic, baseline, PolicySelections, SimulationResults } from './simulationLogic';

export function SimulatorPage() {
  const [policies, setPolicies] = useState<PolicySelections>({
    education: 'moderate',
    antitrust: 'moderate',
    ethics: 'moderate',
  });

  const [results, setResults] = useState<SimulationResults>(baseline);
  const [showModal, setShowModal] = useState(false);
  const [whitepaperContent, setWhitepaperContent] = useState('');

  const handlePolicyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPolicies(prev => ({ ...prev, [name]: value as PolicySelections[keyof PolicySelections] }));
  };

  const handleRunSimulation = () => {
    const finalResults = runSimulationLogic(policies);
    setResults(finalResults);
  };
  
  const generateWhitepaper = () => {
    setWhitepaperContent("Generated whitepaper content based on simulation results...");
    setShowModal(true);
  };

  const chartData = useMemo(() => {
    return [
      { name: 'GDP Growth', value: results.gdp, baseline: baseline.gdp },
      { name: 'Inequality', value: results.inequality, baseline: baseline.inequality },
      { name: 'GHG Growth', value: results.energy, baseline: baseline.energy },
    ];
  }, [results]);

  const colors = ["#34d399", "#f87171", "#fbbf24"];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">AI Policy Impact Simulator</h1>
          <p className="mt-2 text-lg text-gray-400">Test policy packages and visualize their potential economic and environmental trade-offs.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel: Controls */}
          <Card>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Policy Control Panel</h2>
            <div className="space-y-6">
              <div>
                <IconHeader iconName="BookOpen" title="Education & Reskilling" />
                <PolicyOption id="edu-weak" name="education" value="weak" label="Minimal Intervention" description="Limited public funding for reskilling programs." checked={policies.education === 'weak'} onChange={handlePolicyChange} />
                <PolicyOption id="edu-mod" name="education" value="moderate" label="Moderate Reform" description="Public-private partnerships for targeted training." checked={policies.education === 'moderate'} onChange={handlePolicyChange} />
                <PolicyOption id="edu-strong" name="education" value="strong" label="Aggressive Reskilling Initiative" description="Large-scale, federally-funded programs." checked={policies.education === 'strong'} onChange={handlePolicyChange} />
              </div>
               <div>
                <IconHeader iconName="Scale" title="Antitrust & Competition" />
                <PolicyOption id="anti-weak" name="antitrust" value="weak" label="Laissez-faire" description="Allow markets to self-regulate." checked={policies.antitrust === 'weak'} onChange={handlePolicyChange} />
                <PolicyOption id="anti-mod" name="antitrust" value="moderate" label="Targeted Oversight" description="Regulate specific anti-competitive behaviors." checked={policies.antitrust === 'moderate'} onChange={handlePolicyChange} />
                <PolicyOption id="anti-strong" name="antitrust" value="strong" label="Aggressive Anti-Monopoly" description="Proactively break up monopolies." checked={policies.antitrust === 'strong'} onChange={handlePolicyChange} />
              </div>
              <div>
                <IconHeader iconName="ShieldCheck" title="Ethical & Green Guidelines" />
                <PolicyOption id="eth-weak" name="ethics" value="weak" label="Industry Self-Regulation" description="Companies develop voluntary codes." checked={policies.ethics === 'weak'} onChange={handlePolicyChange} />
                <PolicyOption id="eth-mod" name="ethics" value="moderate" label="Standardized Guidelines" description="Government sets standards for fairness." checked={policies.ethics === 'moderate'} onChange={handlePolicyChange} />
                <PolicyOption id="eth-strong" name="ethics" value="strong" label="Comprehensive Regulation" description="Mandatory audits and green mandates." checked={policies.ethics === 'strong'} onChange={handlePolicyChange} />
              </div>
            </div>
            <button onClick={handleRunSimulation} className="w-full mt-8 bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-700">
              Run Simulation
            </button>
          </Card>

          {/* Right Panel: Results */}
          <Card className="flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Simulated Outcomes</h2>
            <div className="flex-grow flex flex-col">
              <div className="h-64 w-full mb-6">
                <ResponsiveContainer>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', borderColor: '#4b5563' }} />
                    <Legend wrapperStyle={{ color: '#d1d5db' }}/>
                    <Bar dataKey="value" name="Simulated Result">
                      {chartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={colors[index % colors.length]} />))}
                    </Bar>
                    <Bar dataKey="baseline" name="Baseline" fill="#4b5563" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                 <div className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-center justify-center text-green-400"><TrendingUp className="mr-2"/>GDP Growth</div>
                    <p className="text-2xl font-bold text-white mt-1">{results.gdp}%</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-center justify-center text-red-400"><Users className="mr-2"/>Inequality Index</div>
                    <p className="text-2xl font-bold text-white mt-1">{results.inequality}</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-center justify-center text-yellow-400"><Zap className="mr-2"/>GHG Growth</div>
                    <p className="text-2xl font-bold text-white mt-1">{results.energy}%</p>
                </div>
              </div>
               <button onClick={generateWhitepaper} className="w-full mt-8 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700">
                Generate Whitepaper
              </button>
            </div>
          </Card>
        </div>
      </div>
      {showModal && <WhitepaperModal content={whitepaperContent} onClose={() => setShowModal(false)} />}
    </div>
  );
}