"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Package,
  Truck,
  Euro,
  TrendingUp,
  AlertTriangle,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  Settings,
  BarChart3,
  PieChart,
  Calendar,
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data (unchanged)
  const stats = {
    totalUsers: 2847,
    activeTransporters: 456,
    totalRequests: 1234,
    completedTransports: 987,
    totalRevenue: 45678,
    monthlyGrowth: 12.5,
  }

  const recentUsers = [
    {
      id: 1,
      name: "Jean Dupont",
      email: "jean.dupont@email.com",
      type: "Client",
      status: "Actif",
      joinDate: "2024-01-10",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      name: "Transport Express SARL",
      email: "contact@transport-express.fr",
      type: "Transporteur",
      status: "En attente",
      joinDate: "2024-01-12",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      name: "Marie Martin",
      email: "marie.martin@email.com",
      type: "Client",
      status: "Actif",
      joinDate: "2024-01-15",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const recentRequests = [
    {
      id: 1,
      title: "Transport de meubles",
      client: "Jean Dupont",
      from: "Paris",
      to: "Lyon",
      status: "En cours",
      amount: "180€",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Livraison matériel informatique",
      client: "TechCorp",
      from: "Marseille",
      to: "Nice",
      status: "Terminé",
      amount: "95€",
      date: "2024-01-14",
    },
    {
      id: 3,
      title: "Transport électroménager",
      client: "Pierre Durand",
      from: "Toulouse",
      to: "Bordeaux",
      status: "Annulé",
      amount: "120€",
      date: "2024-01-13",
    },
  ]

  const reportedIssues = [
    {
      id: 1,
      type: "Retard de livraison",
      reporter: "Marie Martin",
      reported: "Transport Express SARL",
      status: "En cours",
      priority: "Moyenne",
      date: "2024-01-16",
    },
    {
      id: 2,
      type: "Marchandise endommagée",
      reporter: "Jean Dupont",
      reported: "Livraison Rapide",
      status: "Résolu",
      priority: "Haute",
      date: "2024-01-14",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-900 text-gray-100 dark:text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 dark:bg-gray-800 border-b border-blue-600 dark:border-blue-600">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-100 dark:text-gray-100">Administration</h1>
            <p className="text-blue-300 dark:text-blue-300">Gestion de la plateforme TransportEasy</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            <Button variant="outline" size="sm" className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white">
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </Button>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-100 dark:text-gray-100">Admin</div>
              <div className="text-xs text-blue-300 dark:text-blue-300">admin@transporteasy.com</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="text-gray-100 dark:text-gray-100">
          <TabsList className="mb-8 bg-gray-800 dark:bg-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600 dark:data-[state=active]:text-white">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600 dark:data-[state=active]:text-white">Utilisateurs</TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600 dark:data-[state=active]:text-white">Demandes</TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600 dark:data-[state=active]:text-white">Transactions</TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600 dark:data-[state=active]:text-white">Signalements</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600 dark:data-[state=active]:text-white">Analytiques</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gray-800 dark:bg-gray-800 border-blue-600 dark:border-blue-600">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-100 dark:text-gray-100">Utilisateurs totaux</CardTitle>
                    <Users className="h-4 w-4 text-blue-400 dark:text-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-100 dark:text-gray-100">{stats.totalUsers.toLocaleString()}</div>
                    <p className="text-xs text-blue-300 dark:text-blue-300">
                      <span className="text-blue-400 dark:text-blue-400">+{stats.monthlyGrowth}%</span> ce mois
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 dark:bg-gray-800 border-blue-600 dark:border-blue-600">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-100 dark:text-gray-100">Transporteurs actifs</CardTitle>
                    <Truck className="h-4 w-4 text-blue-400 dark:text-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-100 dark:text-gray-100">{stats.activeTransporters}</div>
                    <p className="text-xs text-blue-300 dark:text-blue-300">
                      <span className="text-blue-400 dark:text-blue-400">+8.2%</span> ce mois
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 dark:bg-gray-800 border-blue-600 dark:border-blue-600">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-100 dark:text-gray-100">Demandes totales</CardTitle>
                    <Package className="h-4 w-4 text-blue-400 dark:text-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-100 dark:text-gray-100">{stats.totalRequests.toLocaleString()}</div>
                    <p className="text-xs text-blue-300 dark:text-blue-300">
                      <span className="text-blue-400 dark:text-blue-400">+15.3%</span> ce mois
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 dark:bg-gray-800 border-blue-600 dark:border-blue-600">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-100 dark:text-gray-100">Revenus totaux</CardTitle>
                    <Euro className="h-4 w-4 text-blue-400 dark:text-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-100 dark:text-gray-100">{stats.totalRevenue.toLocaleString()}€</div>
                    <p className="text-xs text-blue-300 dark:text-blue-300">
                      <span className="text-blue-400 dark:text-blue-400">+22.1%</span> ce mois
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="bg-gray-800 dark:bg-gray-800 border-blue-600 dark:border-blue-600">
                  <CardHeader>
                    <CardTitle className="text-gray-100 dark:text-gray-100">Nouveaux utilisateurs</CardTitle>
                    <CardDescription className="text-blue-300 dark:text-blue-300">Dernières inscriptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.map((user) => (
                        <div key={user.id} className="flex items-center space-x-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-blue-600 dark:bg-blue-600 text-white">{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-100 dark:text-gray-100 truncate">{user.name}</p>
                            <p className="text-xs text-blue-300 dark:text-blue-300">{user.email}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={user.type === "Client" ? "secondary" : "outline"} className="bg-blue-600 dark:bg-blue-600 text-white dark:text-white">{user.type}</Badge>
                            <p className="text-xs text-blue-300 dark:text-blue-300 mt-1">{user.joinDate}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 dark:bg-gray-800 border-blue-600 dark:border-blue-600">
                  <CardHeader>
                    <CardTitle className="text-gray-100 dark:text-gray-100">Demandes récentes</CardTitle>
                    <CardDescription className="text-blue-300 dark:text-blue-300">Activité de transport</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentRequests.map((request) => (
                        <div key={request.id} className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-100 dark:text-gray-100">{request.title}</p>
                            <p className="text-xs text-blue-300 dark:text-blue-300">
                              {request.client} • {request.from} → {request.to}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={
                                request.status === "Terminé"
                                  ? "default"
                                  : request.status === "En cours"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className={
                                request.status === "Terminé"
                                  ? "bg-blue-600 dark:bg-blue-600 text-white dark:text-white"
                                  : request.status === "En cours"
                                    ? "bg-blue-500 dark:bg-blue-500 text-white dark:text-white"
                                    : "bg-red-600 dark:bg-red-600 text-white dark:text-white"
                              }
                            >
                              {request.status}
                            </Badge>
                            <p className="text-xs text-blue-300 dark:text-blue-300 mt-1">{request.amount}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-100 dark:text-gray-100">Gestion des utilisateurs</h2>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400 dark:text-blue-400" />
                    <Input placeholder="Rechercher un utilisateur..." className="pl-10 w-64 bg-gray-700 dark:bg-gray-700 text-gray-100 dark:text-gray-100 border-blue-600 dark:border-blue-600" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-40 bg-gray-700 dark:bg-gray-700 text-gray-100 dark:text-gray-100 border-blue-600 dark:border-blue-600">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 dark:bg-gray-700 text-gray-100 dark:text-gray-100 border-blue-600 dark:border-blue-600">
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="client">Clients</SelectItem>
                      <SelectItem value="transporter">Transporteurs</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrer
                  </Button>
                </div>
              </div>

              <Card className="bg-gray-800 dark:bg-gray-800 border-blue-600 dark:border-blue-600">
                <Table>
                  <TableHeader>
                    <TableRow className="border-blue-600 dark:border-blue-600 hover:bg-gray-700 dark:hover:bg-gray-700">
                      <TableHead className="text-gray-100 dark:text-gray-100">Utilisateur</TableHead>
                      <TableHead className="text-gray-100 dark:text-gray-100">Type</TableHead>
                      <TableHead className="text-gray-100 dark:text-gray-100">Statut</TableHead>
                      <TableHead className="text-gray-100 dark:text-gray-100">Date d'inscription</TableHead>
                      <TableHead className="text-gray-100 dark:text-gray-100">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id} className="border-blue-600 dark:border-blue-600 hover:bg-gray-700 dark:hover:bg-gray-700">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-blue-600 dark:bg-blue-600 text-white">{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-100 dark:text-gray-100">{user.name}</div>
                              <div className="text-sm text-blue-300 dark:text-blue-300">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.type === "Client" ? "secondary" : "outline"} className="bg-blue-600 dark:bg-blue-600 text-white dark:text-white">{user.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Actif" ? "default" : "secondary"} className={user.status === "Actif" ? "bg-blue-600 dark:bg-blue-600 text-white dark:text-white" : "bg-blue-500 dark:bg-blue-500 text-white dark:text-white"}>{user.status}</Badge>
                        </TableCell>
                        <TableCell className="text-gray-100 dark:text-gray-100">{user.joinDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white">
                              <Ban className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-100 dark:text-gray-100">Gestion des demandes</h2>
                <div className="flex items-center space-x-2">
                  <Input placeholder="Rechercher une demande..." className="w-64 bg-gray-700 dark:bg-gray-700 text-gray-100 dark:text-gray-100 border-blue-600 dark:border-blue-600" />
                  <Select>
                    <SelectTrigger className="w-40 bg-gray-700 dark:bg-gray-700 text-gray-100 dark:text-gray-100 border-blue-600 dark:border-blue-600">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 dark:bg-gray-700 text-gray-100 dark:text-gray-100 border-blue-600 dark:border-blue-600">
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="active">En cours</SelectItem>
                      <SelectItem value="completed">Terminé</SelectItem>
                      <SelectItem value="cancelled">Annulé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card className="bg-gray-800 dark:bg-gray-800 border-blue-600 dark:border-blue-600">
                <Table>
                  <TableHeader>
                    <TableRow className="border-blue-600 dark:border-blue-600 hover:bg-gray-700 dark:hover:bg-gray-700">
                      <TableHead className="text-gray-100 dark:text-gray-100">Demande</TableHead>
                      <TableHead className="text-gray-100 dark:text-gray-100">Client</TableHead>
                      <TableHead className="text-gray-100 dark:text-gray-100">Itinéraire</TableHead>
                      <TableHead className="text-gray-100 dark:text-gray-100">Statut</TableHead>
                      <TableHead className="text-gray-100 dark:text-gray-100">Montant</TableHead>
                      <TableHead className="text-gray-100 dark:text-gray-100">Date</TableHead>
                      <TableHead className="text-gray-100 dark:text-gray-100">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentRequests.map((request) => (
                      <TableRow key={request.id} className="border-blue-600 dark:border-blue-600 hover:bg-gray-700 dark:hover:bg-gray-700">
                        <TableCell className="font-medium text-gray-100 dark:text-gray-100">{request.title}</TableCell>
                        <TableCell className="text-gray-100 dark:text-gray-100">{request.client}</TableCell>
                        <TableCell className="text-gray-100 dark:text-gray-100">
                          {request.from} → {request.to}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              request.status === "Terminé"
                                ? "default"
                                : request.status === "En cours"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={
                              request.status === "Terminé"
                                ? "bg-blue-600 dark:bg-blue-600 text-white dark:text-white"
                                : request.status === "En cours"
                                  ? "bg-blue-500 dark:bg-blue-500 text-white dark:text-white"
                                  : "bg-red-600 dark:bg-red-600 text-white dark:text-white"
                            }
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-100 dark:text-gray-100">{request.amount}</TableCell>
                        <TableCell className="text-gray-100 dark:text-gray-100">{request.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-100 dark:text-gray-100">Transactions</h2>
                <div className="flex items-center space-x-2">
                  <Input placeholder="Rechercher une transaction..." className="w-64 bg-gray-700 dark:bg-gray-700 text-gray-100 dark:text-gray-100 border-blue-600 dark:border-blue-600" />
                  <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white">
                    <Calendar className="mr-2 h-4 w-4" />
                    Période
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gray-800 dark:bg-gray-800 border-blue-600 dark:border-blue-600">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-100 dark:text-gray-100">Revenus du mois</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-100 dark:text-gray-100">12,450€</div>
                    <p className="text-xs text-blue-400 dark:text-blue-400">+18.2% vs mois dernier</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 dark:bg-gray-800 border-blue-600 dark:border-blue-600">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-100 dark:text-gray-100">Commission moyenne</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-100 dark:text-gray-100">8.5%</div>
                    <p className="text-xs text-blue-300 dark:text-blue-300">Par transaction</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 dark:bg-gray-800 border-blue-600 dark:border-blue-600">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-100 dark:text-gray-100">Transactions en attente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-100 dark:text-gray-100">23</div>
                    <p className="text-xs text-orange-400 dark:text-orange-400">Nécessitent une validation</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-800 dark:bg-gray-800 border-blue-600 dark:border-blue-600">
                <CardHeader>
                  <CardTitle className="text-gray-100 dark:text-gray-100">Dernières transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-blue-600 dark:border-blue-600 hover:bg-gray-700 dark:hover:bg-gray-700">
                        <TableHead className="text-gray-100 dark:text-gray-100">ID Transaction</TableHead>
                        <TableHead className="text-gray-100 dark:text-gray-100">Client</TableHead>
                        <TableHead className="text-gray-100 dark:text-gray-100">Transporteur</TableHead>
                        <TableHead className="text-gray-100 dark:text-gray-100">Montant</TableHead>
                        <TableHead className="text-gray-100 dark:text-gray-100">Commission</TableHead>
                        <TableHead className="text-gray-100 dark:text-gray-100">Statut</TableHead>
                        <TableHead className="text-gray-100 dark:text-gray-100">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-blue-600 dark:border-blue-600 hover:bg-gray-700 dark:hover:bg-gray-700">
                        <TableCell className="font-mono text-gray-100 dark:text-gray-100">#TXN-001</TableCell>
                        <TableCell className="text-gray-100 dark:text-gray-100">Jean Dupont</TableCell>
                        <TableCell className="text-gray-100 dark:text-gray-100">Transport Express</TableCell>
                        <TableCell className="text-gray-100 dark:text-gray-100">180€</TableCell>
                        <TableCell className="text-gray-100 dark:text-gray-100">15.30€</TableCell>
                        <TableCell>
                          <Badge variant="default" className="bg-blue-600 dark:bg-blue-600 text-white dark:text-white">Terminé</Badge>
                        </TableCell>
                        <TableCell className="text-gray-100 dark:text-gray-100">2024-01-15</TableCell>
                      </TableRow>
                      <TableRow className="border-blue-600 dark:border-blue-600 hover:bg-gray-700 dark:hover:bg-gray-700">
                        <TableCell className="font-mono text-gray-100 dark:text-gray-100">#TXN-002</TableCell>
                        <TableCell className="text-gray-100 dark:text-gray-100">Marie Martin</TableCell>
                        <TableCell className="text-gray-100 dark:text-gray-100">Livraison Rapide</TableCell>
                        <TableCell className="text-gray-100 dark:text-gray-100">95€</TableCell>
                        <TableCell className="text-gray-100 dark:text-gray-100">8.08€</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-blue-500 dark:bg-blue-500 text-white dark:text-white">En cours</Badge>
                        </TableCell>
                        <TableCell className="text-gray-100 dark:text-gray-100">2024-01-14</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-100 dark:text-gray-100">Signalements et modération</h2>
                <div className="flex items-center space-x-2">
                  <Select>
                    <SelectTrigger className="w-40 bg-gray-700 dark:bg-gray-700 text-gray-100 dark:text-gray-100 border-blue-600 dark:border-blue-600">
                      <SelectValue placeholder="Priorité" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 dark:bg-gray-700 text-gray-100 dark:text-gray-100 border-blue-600 dark:border-blue-600">
                      <SelectItem value="all">Toutes</SelectItem>
                      <SelectItem value="high">Haute</SelectItem>
                      <SelectItem value="medium">Moyenne</SelectItem>
                      <SelectItem value="low">Basse</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-40 bg-gray-700 dark:bg-gray-700 text-gray-100 dark:text-gray-100 border-blue-600 dark:border-blue-600">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 dark:bg-gray-700 text-gray-100 dark:text-gray-100 border-blue-600 dark:border-blue-600">
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="pending">En cours</SelectItem>
                      <SelectItem value="resolved">Résolu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card className="bg-gray-800 dark:bg-gray-800 border-blue-600 dark:border-blue-600">
                <Table>
                  <TableHeader>
                    <TableRow className="border-blue-600 dark:border-blue-600 hover:bg-gray-700 dark:hover:bg-gray-700">
                      <TableHead className="text-gray-100 dark:text-gray-100">Type de signalement</TableHead>
                      <TableHead className="text-gray-100 dark:text-gray-100">Signalé par</TableHead>
                      <TableHead className="text-gray-100 dark:text-gray-100">Utilisateur signalé</TableHead>
                      <TableHead className="text-gray-100 dark:text-gray-100">Priorité</TableHead>
                      <TableHead className="text-gray-100 dark:text-gray-100">Statut</TableHead>
                      <TableHead className="text-gray-100 dark:text-gray-100">Date</TableHead>
                      <TableHead className="text-gray-100 dark:text-gray-100">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportedIssues.map((issue) => (
                      <TableRow key={issue.id} className="border-blue-600 dark:border-blue-600 hover:bg-gray-700 dark:hover:bg-gray-700">
                        <TableCell>
                          <div className="flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2 text-orange-400 dark:text-orange-400" />
                            <span className="text-gray-100 dark:text-gray-100">{issue.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-100 dark:text-gray-100">{issue.reporter}</TableCell>
                        <TableCell className="text-gray-100 dark:text-gray-100">{issue.reported}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              issue.priority === "Haute"
                                ? "destructive"
                                : issue.priority === "Moyenne"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              issue.priority === "Haute"
                                ? "bg-red-600 dark:bg-red-600 text-white dark:text-white"
                                : issue.priority === "Moyenne"
                                  ? "bg-blue-500 dark:bg-blue-500 text-white dark:text-white"
                                  : "bg-gray-600 dark:bg-gray-600 text-white dark:text-white"
                            }
                          >
                            {issue.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={issue.status === "Résolu" ? "default" : "secondary"} className={issue.status === "Résolu" ? "bg-blue-600 dark:bg-blue-600 text-white dark:text-white" : "bg-blue-500 dark:bg-blue-500 text-white dark:text-white"}>{issue.status}</Badge>
                        </TableCell>
                        <TableCell className="text-gray-100 dark:text-gray-100">{issue.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-100 dark:text-gray-100">Analytiques et rapports</h2>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-gray-800 dark:bg-gray-800 border-blue-600 dark:border-blue-600">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-100 dark:text-gray-100">
                      <BarChart3 className="mr-2 h-5 w-5 text-blue-400 dark:text-blue-400" />
                      Évolution des inscriptions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-700 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <div className="text-center text-blue-300 dark:text-blue-300">
                        <BarChart3 className="h-12 w-12 mx-auto mb-2 text-blue-400 dark:text-blue-400" />
                        <p>Graphique des inscriptions</p>
                        <p className="text-sm">Par mois sur 12 mois</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 dark:bg-gray-800 border-blue-600 dark:border-blue-600">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-100 dark:text-gray-100">
                      <PieChart className="mr-2 h-5 w-5 text-blue-400 dark:text-blue-400" />
                      Répartition des utilisateurs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-700 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <div className="text-center text-blue-300 dark:text-blue-300">
                        <PieChart className="h-12 w-12 mx-auto mb-2 text-blue-400 dark:text-blue-400" />
                        <p>Répartition Clients/Transporteurs</p>
                        <div className="text-sm mt-2">
                          <div>Clients: 75%</div>
                          <div>Transporteurs: 25%</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 dark:bg-gray-800 border-blue-600 dark:border-blue-600">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-100 dark:text-gray-100">
                      <TrendingUp className="mr-2 h-5 w-5 text-blue-400 dark:text-blue-400" />
                      Revenus mensuels
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-700 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <div className="text-center text-blue-300 dark:text-blue-300">
                        <TrendingUp className="h-12 w-12 mx-auto mb-2 text-blue-400 dark:text-blue-400" />
                        <p>Évolution des revenus</p>
                        <p className="text-sm">Croissance: +22.1%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 dark:bg-gray-800 border-blue-600 dark:border-blue-600">
                  <CardHeader>
                    <CardTitle className="text-gray-100 dark:text-gray-100">Métriques clés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-300 dark:text-blue-300">Taux de conversion</span>
                        <span className="font-medium text-gray-100 dark:text-gray-100">12.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-300 dark:text-blue-300">Satisfaction client</span>
                        <span className="font-medium text-gray-100 dark:text-gray-100">4.8/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-300 dark:text-blue-300">Temps de réponse moyen</span>
                        <span className="font-medium text-gray-100 dark:text-gray-100">2.3h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-300 dark:text-blue-300">Taux d'annulation</span>
                        <span className="font-medium text-gray-100 dark:text-gray-100">3.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-300 dark:text-blue-300">Transporteurs actifs/mois</span>
                        <span className="font-medium text-gray-100 dark:text-gray-100">89%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}