"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Plus, MapPin, Calendar, Euro, Eye, MessageCircle, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("requests")

  const mockRequests = [
    {
      id: 1,
      title: "Transport de meubles",
      from: "Paris",
      to: "Lyon",
      date: "2024-01-15",
      status: "En attente",
      offers: 3,
      budget: "150-200€",
    },
    {
      id: 2,
      title: "Livraison de matériel informatique",
      from: "Marseille",
      to: "Nice",
      date: "2024-01-20",
      status: "Accepté",
      offers: 5,
      budget: "80-120€",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-blue-900 border-b border-blue-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-300 hover:text-blue-200 hover:bg-blue-800/30 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Accueil
            </Button>
            </Link>
            <h1 className="text-2xl font-bold text-white">Dashboard Client</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-blue-200">Bonjour, Jean Dupont</span>
            <Button variant="outline" size="sm" className="border-blue-400 text-blue-300 hover:bg-blue-800/50 hover:text-blue-200">
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 bg-gradient-to-r from-gray-900 to-blue-900 border border-blue-800">
            <TabsTrigger 
              value="requests" 
              className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-blue-300 hover:text-blue-200 hover:bg-blue-800/30"
            >
              Mes demandes
            </TabsTrigger>
            <TabsTrigger 
              value="new-request"
              className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-blue-300 hover:text-blue-200 hover:bg-blue-800/30"
            >
              Nouvelle demande
            </TabsTrigger>
            <TabsTrigger 
              value="profile"
              className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-blue-300 hover:text-blue-200 hover:bg-blue-800/30"
            >
              Profil
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Mes demandes de transport</h2>
                <Button 
                  onClick={() => setActiveTab("new-request")}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvelle demande
                </Button>
              </div>

              <div className="grid gap-6">
                {mockRequests.map((request) => (
                  <Card key={request.id} className="bg-gradient-to-br from-gray-900 to-blue-950 border-blue-800 shadow-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-white">{request.title}</CardTitle>
                        <Badge 
                          variant={request.status === "Accepté" ? "default" : "secondary"}
                          className={request.status === "Accepté" 
                            ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white" 
                            : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                          }
                        >
                          {request.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        <div className="flex items-center space-x-4 text-sm text-blue-300">
                          <span className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            {request.from} → {request.to}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            {request.date}
                          </span>
                          <span className="flex items-center">
                            <Euro className="mr-1 h-4 w-4" />
                            {request.budget}
                          </span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-300">{request.offers} offre(s) reçue(s)</span>
                        <div className="flex space-x-2">
                            <Link to={`/request/${request.id}`}>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-blue-500 text-blue-300 hover:bg-blue-800/50 hover:text-blue-200"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Voir les offres
                          </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-blue-500 text-blue-300 hover:bg-blue-800/50 hover:text-blue-200"
                          >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Messages
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="new-request">
            <Card className="bg-gradient-to-br from-gray-900 to-blue-950 border-blue-800 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-900/50 to-blue-800/50">
                <CardTitle className="text-white">Nouvelle demande de transport</CardTitle>
                <CardDescription className="text-blue-200">
                  Décrivez votre besoin de transport pour recevoir des offres
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-blue-200">Titre de la demande</Label>
                    <Input 
                      id="title" 
                      placeholder="Ex: Transport de meubles" 
                      required 
                      className="bg-gray-800 border-blue-600 text-white placeholder-blue-300 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="from" className="text-blue-200">Lieu de départ</Label>
                      <Input 
                        id="from" 
                        placeholder="Ville de départ" 
                        required 
                        className="bg-gray-800 border-blue-600 text-white placeholder-blue-300 focus:border-blue-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="to" className="text-blue-200">Lieu d'arrivée</Label>
                      <Input 
                        id="to" 
                        placeholder="Ville d'arrivée" 
                        required 
                        className="bg-gray-800 border-blue-600 text-white placeholder-blue-300 focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-gray-300">Date souhaitée</Label>
                      <Input 
                        id="date" 
                        type="date" 
                        required 
                        className="bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="urgency" className="text-gray-300">Urgence</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-blue-500">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="low" className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700">Pas urgent</SelectItem>
                          <SelectItem value="medium" className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700">Modéré</SelectItem>
                          <SelectItem value="high" className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-300">Description détaillée</Label>
                    <Textarea
                      id="description"
                      placeholder="Décrivez votre marchandise, dimensions, poids, précautions particulières..."
                      rows={4}
                      required
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight" className="text-gray-300">Poids (kg)</Label>
                      <Input 
                        id="weight" 
                        type="number" 
                        placeholder="0" 
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="volume" className="text-gray-300">Volume (m³)</Label>
                      <Input 
                        id="volume" 
                        type="number" 
                        step="0.1" 
                        placeholder="0" 
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-gray-300">Budget (€)</Label>
                      <Input 
                        id="budget" 
                        type="number" 
                        placeholder="0" 
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg">
                    <Package className="mr-2 h-4 w-4" />
                    Publier la demande
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="bg-gradient-to-br from-gray-900 to-blue-950 border-blue-800 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-900/50 to-blue-800/50">
                <CardTitle className="text-white">Mon profil</CardTitle>
                <CardDescription className="text-blue-200">
                  Gérez vos informations personnelles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-blue-200">Prénom</Label>
                      <Input 
                        id="firstName" 
                        defaultValue="Jean" 
                        className="bg-gray-800 border-blue-600 text-white focus:border-blue-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-blue-200">Nom</Label>
                      <Input 
                        id="lastName" 
                        defaultValue="Dupont" 
                        className="bg-gray-800 border-blue-600 text-white focus:border-blue-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-blue-200">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      defaultValue="jean.dupont@email.com" 
                      className="bg-gray-800 border-blue-600 text-white focus:border-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-blue-200">Téléphone</Label>
                    <Input 
                      id="phone" 
                      defaultValue="06 12 34 56 78" 
                      className="bg-gray-800 border-blue-600 text-white focus:border-blue-400"
                    />
                  </div>
                  <Button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg">
                    Sauvegarder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}