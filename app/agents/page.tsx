'use client';

import { 
	Button, 
	Heading, 
	Text, 
	Card, 
	Badge, 
	Separator, 
	Link,
	TextField,
	TextArea,
	Select,
	Switch,
	Checkbox,
	RadioGroup,
	RadioGroupItem
} from "frosted-ui";
import { useState } from 'react';

interface Agent {
	id: string;
	name: string;
	description: string;
	type: 'customer-service' | 'sales' | 'content' | 'analytics';
	status: 'active' | 'inactive';
	model: string;
	temperature: number;
	maxTokens: number;
	systemPrompt: string;
	integrations: string[];
}

const AGENT_TYPES = [
	{ value: 'customer-service', label: 'Customer Service' },
	{ value: 'sales', label: 'Sales Assistant' },
	{ value: 'content', label: 'Content Creator' },
	{ value: 'analytics', label: 'Analytics Bot' }
];

const MODELS = [
	{ value: 'gpt-4', label: 'GPT-4' },
	{ value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
	{ value: 'claude-3-opus', label: 'Claude 3 Opus' },
	{ value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' }
];

const INTEGRATIONS = [
	{ value: 'discord', label: 'Discord' },
	{ value: 'telegram', label: 'Telegram' },
	{ value: 'stripe', label: 'Stripe' },
	{ value: 'whop-api', label: 'Whop API' }
];

export default function AgentsPage() {
	const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
	const [agents, setAgents] = useState<Agent[]>([
		{
			id: '1',
			name: 'Customer Support Bot',
			description: 'Handles customer inquiries and support tickets',
			type: 'customer-service',
			status: 'active',
			model: 'gpt-4',
			temperature: 0.3,
			maxTokens: 2048,
			systemPrompt: 'You are a helpful customer service representative.',
			integrations: ['discord', 'whop-api']
		},
		{
			id: '2',
			name: 'Sales Assistant',
			description: 'Helps convert prospects into customers',
			type: 'sales',
			status: 'inactive',
			model: 'claude-3-sonnet',
			temperature: 0.7,
			maxTokens: 1024,
			systemPrompt: 'You are a persuasive sales assistant.',
			integrations: ['telegram', 'stripe']
		}
	]);

	const [formData, setFormData] = useState<Partial<Agent>>({
		name: '',
		description: '',
		type: 'customer-service',
		status: 'active',
		model: 'gpt-4',
		temperature: 0.5,
		maxTokens: 1024,
		systemPrompt: '',
		integrations: []
	});

	const handleCreateAgent = () => {
		const newAgent: Agent = {
			id: Date.now().toString(),
			...formData as Agent
		};
		setAgents([...agents, newAgent]);
		setFormData({
			name: '',
			description: '',
			type: 'customer-service',
			status: 'active',
			model: 'gpt-4',
			temperature: 0.5,
			maxTokens: 1024,
			systemPrompt: '',
			integrations: []
		});
	};

	return (
		<div className="min-h-screen p-6 bg-gray-1">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8">
					<Heading size="9" className="mb-4">
						Agent Configuration
					</Heading>
					<Text size="5" color="gray">
						Manage and configure your AI agents
					</Text>
				</div>

				<div className="grid gap-6 lg:grid-cols-3">
					{/* Agent List */}
					<div className="lg:col-span-1">
						<Card className="p-6">
							<div className="flex items-center justify-between mb-4">
								<Heading size="4">Active Agents</Heading>
								<Badge color="blue">{agents.length}</Badge>
							</div>
							
							<div className="space-y-3">
								{agents.map((agent) => (
									<Card 
										key={agent.id}
										className={`p-4 cursor-pointer transition-colors ${
											selectedAgent === agent.id ? 'bg-blue-3' : 'hover:bg-gray-3'
										}`}
										onClick={() => setSelectedAgent(agent.id)}
									>
										<div className="flex items-center justify-between mb-2">
											<Text size="3" weight="bold">{agent.name}</Text>
											<Badge 
												color={agent.status === 'active' ? 'green' : 'gray'}
												size="1"
											>
												{agent.status}
											</Badge>
										</div>
										<Text size="2" color="gray">{agent.description}</Text>
										<div className="flex gap-1 mt-2">
											<Badge color="purple" size="1">{agent.type}</Badge>
											<Badge color="orange" size="1">{agent.model}</Badge>
										</div>
									</Card>
								))}
							</div>
						</Card>
					</div>

					{/* Configuration Panel */}
					<div className="lg:col-span-2">
						<Card className="p-6">
							<Heading size="5" className="mb-6">
								{selectedAgent ? 'Edit Agent' : 'Create New Agent'}
							</Heading>

							<div className="grid gap-6 md:grid-cols-2">
								{/* Basic Information */}
								<div className="space-y-4">
									<div>
										<Text size="2" weight="bold" className="mb-2 block">
											Agent Name
										</Text>
										<TextField.Root
											placeholder="Enter agent name"
											value={formData.name}
											onChange={(e) => setFormData({...formData, name: e.target.value})}
										/>
									</div>

									<div>
										<Text size="2" weight="bold" className="mb-2 block">
											Description
										</Text>
										<TextArea
											placeholder="Describe what this agent does"
											value={formData.description}
											onChange={(e) => setFormData({...formData, description: e.target.value})}
										/>
									</div>

									<div>
										<Text size="2" weight="bold" className="mb-2 block">
											Agent Type
										</Text>
										<Select.Root
											value={formData.type}
											onValueChange={(value) => setFormData({...formData, type: value as Agent['type']})}
										>
											<Select.Trigger />
											<Select.Content>
												{AGENT_TYPES.map((type) => (
													<Select.Item key={type.value} value={type.value}>
														{type.label}
													</Select.Item>
												))}
											</Select.Content>
										</Select.Root>
									</div>

									<div>
										<Text size="2" weight="bold" className="mb-2 block">
											Status
										</Text>
										<div className="flex items-center space-x-2">
											<Switch
												checked={formData.status === 'active'}
												onCheckedChange={(checked) => 
													setFormData({...formData, status: checked ? 'active' : 'inactive'})
												}
											/>
											<Text size="2">
												{formData.status === 'active' ? 'Active' : 'Inactive'}
											</Text>
										</div>
									</div>
								</div>

								{/* Model Configuration */}
								<div className="space-y-4">
									<div>
										<Text size="2" weight="bold" className="mb-2 block">
											Model
										</Text>
										<Select.Root
											value={formData.model}
											onValueChange={(value) => setFormData({...formData, model: value})}
										>
											<Select.Trigger />
											<Select.Content>
												{MODELS.map((model) => (
													<Select.Item key={model.value} value={model.value}>
														{model.label}
													</Select.Item>
												))}
											</Select.Content>
										</Select.Root>
									</div>

									<div>
										<Text size="2" weight="bold" className="mb-2 block">
											Temperature: {formData.temperature}
										</Text>
										<input
											type="range"
											min="0"
											max="2"
											step="0.1"
											value={formData.temperature}
											onChange={(e) => setFormData({...formData, temperature: parseFloat(e.target.value)})}
											className="w-full"
										/>
										<div className="flex justify-between text-xs text-gray-500 mt-1">
											<span>Focused</span>
											<span>Creative</span>
										</div>
									</div>

									<div>
										<Text size="2" weight="bold" className="mb-2 block">
											Max Tokens
										</Text>
										<TextField.Root
											type="number"
											placeholder="1024"
											value={formData.maxTokens?.toString()}
											onChange={(e) => setFormData({...formData, maxTokens: parseInt(e.target.value)})}
										/>
									</div>
								</div>
							</div>

							<Separator className="my-6" />

							{/* System Prompt */}
							<div className="mb-6">
								<Text size="2" weight="bold" className="mb-2 block">
									System Prompt
								</Text>
								<TextArea
									placeholder="Enter the system prompt that defines the agent's behavior"
									rows={4}
									value={formData.systemPrompt}
									onChange={(e) => setFormData({...formData, systemPrompt: e.target.value})}
								/>
							</div>

							{/* Integrations */}
							<div className="mb-6">
								<Text size="2" weight="bold" className="mb-3 block">
									Integrations
								</Text>
								<div className="grid grid-cols-2 gap-3">
									{INTEGRATIONS.map((integration) => (
										<div key={integration.value} className="flex items-center space-x-2">
											<Checkbox
												checked={formData.integrations?.includes(integration.value)}
												onCheckedChange={(checked) => {
													const current = formData.integrations || [];
													if (checked) {
														setFormData({...formData, integrations: [...current, integration.value]});
													} else {
														setFormData({...formData, integrations: current.filter(i => i !== integration.value)});
													}
												}}
											/>
											<Text size="2">{integration.label}</Text>
										</div>
									))}
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex gap-3 justify-end">
								<Button variant="soft" color="gray">
									Cancel
								</Button>
								<Button onClick={handleCreateAgent}>
									{selectedAgent ? 'Update Agent' : 'Create Agent'}
								</Button>
							</div>
						</Card>
					</div>
				</div>

				{/* Agent Analytics */}
				<div className="mt-8">
					<Card className="p-6">
						<Heading size="5" className="mb-4">
							Agent Performance
						</Heading>
						<div className="grid gap-4 md:grid-cols-4">
							<Card className="p-4 text-center">
								<Text size="6" weight="bold" color="blue">24</Text>
								<Text size="2" color="gray">Total Conversations</Text>
							</Card>
							<Card className="p-4 text-center">
								<Text size="6" weight="bold" color="green">18</Text>
								<Text size="2" color="gray">Resolved Issues</Text>
							</Card>
							<Card className="p-4 text-center">
								<Text size="6" weight="bold" color="purple">4.8</Text>
								<Text size="2" color="gray">Average Rating</Text>
							</Card>
							<Card className="p-4 text-center">
								<Text size="6" weight="bold" color="orange">92%</Text>
								<Text size="2" color="gray">Success Rate</Text>
							</Card>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}