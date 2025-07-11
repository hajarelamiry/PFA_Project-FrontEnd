"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Truck, MapPin, Calendar, Euro, Package, Star, MessageCircle, CheckCircle, Plus } from "lucide-react"

export default function TransporterDashboard() {
  const [activeTab, setActiveTab] = useState("available")

  const mockRequests = [
    {
      id: 1,
      title: "Transport de meubles",
      from: "Paris",
      to: "Lyon",
      date: "2024-01-15",
      budget: "150-200€",
      weight: "50kg",
      volume: "2m³",
      description: "Déménagement partiel, quelques meubles fragiles",
      client: "Jean Dupont",
      rating: 4.8,
      distance: "465 km",
    },
    {
      id: 2,
      title: "Livraison de matériel informatique",
      from: "Marseille",
      to: "Nice",
      date: "2024-01-20",
      budget: "80-120€",
      weight: "15kg",
      volume: "0.5m³",
      description: "Ordinateurs et équipements fragiles, emballage soigné requis",
      client: "Marie Martin",
      rating: 5.0,
      distance: "200 km",
    },
  ]

  const myOffers = [
    {
      id: 1,
      requestTitle: "Transport de meubles",
      myPrice: "180€",
      status: "En attente",
      client: "Jean Dupont",
      date: "2024-01-15",
    },
    {
      id: 2,
      requestTitle: "Livraison électroménager",
      myPrice: "120€",
      status: "Accepté",
      client: "Pierre Durand",
      date: "2024-01-18",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Dashboard Transporteur</h1>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-300">Transport Express SARL</div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-sm font-medium text-white">4.9 (127 avis)</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 bg-gray-800 border-gray-700">
            <TabsTrigger value="available" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300">
              Demandes disponibles
            </TabsTrigger>
            <TabsTrigger value="my-offers" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300">
              Mes offres
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300">
              Transports actifs
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300">
              Profil
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Demandes de transport disponibles</h2>
                <div className="flex items-center space-x-2">
                  <Input 
                    placeholder="Filtrer par ville..." 
                    className="w-64 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500" 
                  />
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                    Filtrer
                  </Button>
                </div>
              </div>

              <div className="grid gap-6">
                {mockRequests.map((request) => (
                  <Card key={request.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-white">{request.title}</CardTitle>
                        <Badge variant="outline" className="border-blue-500 text-blue-400 bg-blue-950">
                          {request.distance}
                        </Badge>
                      </div>
                      <CardDescription>
                        <div className="flex items-center space-x-4 text-sm text-gray-300">
                          <span className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4 text-blue-400" />
                            {request.from} → {request.to}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4 text-blue-400" />
                            {request.date}
                          </span>
                          <span className="flex items-center">
                            <Euro className="mr-1 h-4 w-4 text-green-400" />
                            {request.budget}
                          </span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-300">{request.description}</p>

                        <div className="flex items-center space-x-6 text-sm">
                          <span className="flex items-center text-gray-300">
                            <Package className="mr-1 h-4 w-4 text-blue-400" />
                            {request.weight} • {request.volume}
                          </span>
                          <span className="flex items-center text-gray-300">
                            <Star className="mr-1 h-4 w-4 text-yellow-400" />
                            Client: {request.client} ({request.rating}/5)
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                          <div className="text-sm text-gray-400">Publié il y a 2 heures</div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                              <MessageCircle className="mr-2 h-4 w-4" />
                              Contacter
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                              Faire une offre
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="my-offers">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Mes offres</h2>

              <div className="grid gap-6">
                {myOffers.map((offer) => (
                  <Card key={offer.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-white">{offer.requestTitle}</CardTitle>
                        <Badge 
                          variant={offer.status === "Accepté" ? "default" : "secondary"}
                          className={offer.status === "Accepté" ? "bg-green-600 text-white" : "bg-gray-600 text-gray-200"}
                        >
                          {offer.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-300">
                        Client: {offer.client} • Date: {offer.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-semibold text-green-400">Mon offre: {offer.myPrice}</span>
                        </div>
                        <div className="flex space-x-2">
                          {offer.status === "Accepté" ? (
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Voir les détails
                            </Button>
                          ) : (
                            <>
                              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                                Modifier l'offre
                              </Button>
                              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Messages
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Transports en cours</h2>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Truck className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-400">Aucun transport en cours</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="grid gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Informations de l'entreprise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-gray-300">Nom de l'entreprise</Label>
                      <Input 
                        id="companyName" 
                        defaultValue="Transport Express SARL" 
                        className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="siret" className="text-gray-300">SIRET</Label>
                        <Input 
                          id="siret" 
                          defaultValue="12345678901234" 
                          className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-300">Téléphone</Label>
                        <Input 
                          id="phone" 
                          defaultValue="01 23 45 67 89" 
                          className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-gray-300">Description de l'entreprise</Label>
                      <Textarea
                        id="description"
                        defaultValue="Entreprise de transport spécialisée dans la livraison rapide et sécurisée."
                        rows={3}
                        className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                      />
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Sauvegarder
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Véhicules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg bg-gray-750">
                      <div>
                        <h4 className="font-medium text-white">Camion 3.5T</h4>
                        <p className="text-sm text-gray-400">Charge utile: 1500kg • Volume: 12m³</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                        Modifier
                      </Button>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter un véhicule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}