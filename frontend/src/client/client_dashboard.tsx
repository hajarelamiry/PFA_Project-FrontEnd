"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Plus, MapPin, Calendar, Euro, Eye, MessageCircle, ArrowLeft, Loader2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

interface ShipmentRequest {
  id: number
  description: string
  origin: { city: string }
  destination: { city: string }
  preferredDate: string
  status: string
  offers?: number
  maxPrice: number
}

interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
}

class ShipmentRequestService {
  private static getBaseUrl(): string {
    return process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://votre-api-prod.com'
  }

  static async createShipmentRequest(data: any, accessToken: string): Promise<ShipmentRequest> {
    const response = await fetch(`${this.getBaseUrl()}/shipment-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Erreur lors de la création de la demande')
    }

    return response.json()
  }

  static async getShipmentRequests(accessToken: string): Promise<ShipmentRequest[]> {
    const response = await fetch(`${this.getBaseUrl()}/shipment-requests`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Erreur lors de la récupération des demandes')
    }

    return response.json()
  }

  static async getUserProfile(accessToken: string): Promise<UserProfile> {
    const response = await fetch(`${this.getBaseUrl()}/auth/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Erreur lors de la récupération du profil')
    }

    return response.json()
  }

  static async updateUserProfile(data: Partial<UserProfile> & { password?: string }, accessToken: string): Promise<UserProfile> {
    const response = await fetch(`${this.getBaseUrl()}/auth/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Erreur lors de la mise à jour du profil')
    }

    return response.json()
  }
}

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("requests")
  const [requests, setRequests] = useState<ShipmentRequest[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isProfileLoading, setIsProfileLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    originCity: "",
    destinationCity: "",
    preferredDate: "",
    urgency: "low",
    description: "",
    weight: "",
    volume: "",
    maxPrice: "",
    originAddress: "",
    originLatitude: "",
    originLongitude: "",
    originZipcode: "",
    originCountry: "",
    destinationAddress: "",
    destinationLatitude: "",
    destinationLongitude: "",
    destinationZipcode: "",
    destinationCountry: "",
    dimensions: "",
    fragile: false,
    refrigerated: false,
  })
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: localStorage.getItem('userEmail') || "",
    phone: "",
    address: "",
    password: "",
  })
  const navigate = useNavigate()

  const accessToken = localStorage.getItem('accessToken')
  const userId = localStorage.getItem('userId')
  const userEmail = localStorage.getItem('userEmail') || 'Utilisateur'

  useEffect(() => {
    if (!accessToken || !userId) {
      toast.error('Veuillez vous connecter')
      navigate('/login')
      return
    }

    const fetchData = async () => {
      try {
        // Fetch shipment requests
        const requestsData = await ShipmentRequestService.getShipmentRequests(accessToken)
        setRequests(requestsData)

        // Fetch profile data when profile tab is active
        if (activeTab === "profile") {
          setIsProfileLoading(true)
          const profile = await ShipmentRequestService.getUserProfile(accessToken)
          // Log for debugging
          console.log('Fetched profile email:', profile.email, 'Stored userEmail:', userEmail)
          if (profile.email !== userEmail) {
            console.warn('Email mismatch detected:', { profileEmail: profile.email, storedEmail: userEmail })
          }
          setProfileData({
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            email: profile.email || userEmail, // Fallback to userEmail if profile.email is empty
            phone: profile.phone || "",
            address: profile.address || "",
            password: "",
          })
          setIsProfileLoading(false)
        }
      } catch (error: any) {
        toast.error(error.message || 'Erreur lors de la récupération des données')
        if (error.message.includes('Unauthorized')) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('userId')
          localStorage.removeItem('userType')
          localStorage.removeItem('userEmail')
          navigate('/login')
        }
      }
    }

    fetchData()
  }, [accessToken, userId, navigate, activeTab, userEmail])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleProfileInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!accessToken || !userId) {
      toast.error('Veuillez vous connecter')
      navigate('/login')
      return
    }

    setIsLoading(true)
    try {
      const dimensions = formData.dimensions.split(',').map(Number).filter(n => !isNaN(n))
      if (dimensions.length !== 3) {
        throw new Error('Les dimensions doivent être au format longueur,largeur,hauteur')
      }

      const data = {
        originAddress: formData.originAddress,
        originLatitude: parseFloat(formData.originLatitude) || undefined,
        originLongitude: parseFloat(formData.originLongitude) || undefined,
        originCity: formData.originCity,
        originZipcode: formData.originZipcode,
        originCountry: formData.originCountry,
        destinationAddress: formData.destinationAddress,
        destinationLatitude: parseFloat(formData.destinationLatitude) || undefined,
        destinationLongitude: parseFloat(formData.destinationLongitude) || undefined,
        destinationCity: formData.destinationCity,
        destinationZipcode: formData.destinationZipcode,
        destinationCountry: formData.destinationCountry,
        preferredDate: formData.preferredDate,
        weight: parseFloat(formData.weight) || undefined,
        volume: parseFloat(formData.volume) || undefined,
        dimensions,
        description: formData.title || undefined,
        fragile: formData.fragile,
        refrigerated: formData.refrigerated,
        maxPrice: parseFloat(formData.maxPrice) || undefined,
      }

      await ShipmentRequestService.createShipmentRequest(data, accessToken)
      toast.success('Demande d\'expédition créée avec succès !')
      setActiveTab('requests')
      const updatedRequests = await ShipmentRequestService.getShipmentRequests(accessToken)
      setRequests(updatedRequests)
      setFormData({
        title: "",
        originCity: "",
        destinationCity: "",
        preferredDate: "",
        urgency: "low",
        description: "",
        weight: "",
        volume: "",
        maxPrice: "",
        originAddress: "",
        originLatitude: "",
        originLongitude: "",
        originZipcode: "",
        originCountry: "",
        destinationAddress: "",
        destinationLatitude: "",
        destinationLongitude: "",
        destinationZipcode: "",
        destinationCountry: "",
        dimensions: "",
        fragile: false,
        refrigerated: false,
      })
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la création de la demande')
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!accessToken || !userId) {
      toast.error('Veuillez vous connecter')
      navigate('/login')
      return
    }

    if (profileData.password && profileData.password.length < 8) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères')
      return
    }

    setIsProfileLoading(true)
    try {
      const data: Partial<UserProfile> & { password?: string } = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phone: profileData.phone,
        address: profileData.address,
      }
      if (profileData.password) {
        data.password = profileData.password
      }

      const updatedProfile = await ShipmentRequestService.updateUserProfile(data, accessToken)
      toast.success('Profil mis à jour avec succès !')
      // Sync userEmail in localStorage if email changed
      if (updatedProfile.email !== userEmail) {
        console.log('Updating localStorage email:', updatedProfile.email)
        localStorage.setItem('userEmail', updatedProfile.email)
      }
      // Update profileData with the response to ensure consistency
      setProfileData({
        firstName: updatedProfile.firstName || "",
        lastName: updatedProfile.lastName || "",
        email: updatedProfile.email || userEmail,
        phone: updatedProfile.phone || "",
        address: updatedProfile.address || "",
        password: "",
      })
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la mise à jour du profil')
      if (error.message.includes('Unauthorized')) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userId')
        localStorage.removeItem('userType')
        localStorage.removeItem('userEmail')
        navigate('/login')
      }
    } finally {
      setIsProfileLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('userType')
    localStorage.removeItem('userEmail')
    toast.success('Déconnexion réussie')
    navigate('/login')
  }

  // Fonction de validation du numéro de téléphone
 const validatePhoneNumber = (phone: string) => {
  // Regex pour valider le format: +[code pays][numéros]
  // Exemple: +33123456789, +212612345678, +1234567890
  const phoneRegex = /^\+\d{1,4}\d{6,14}$/;
  return phoneRegex.test(phone);
 };

 // Fonction pour formater automatiquement le numéro
 const formatPhoneNumber = (value: string) => {
  // Supprimer tous les caractères non numériques sauf le +
  let cleaned = value.replace(/[^\d+]/g, '');
  
  // S'assurer que le + est au début
  if (cleaned && !cleaned.startsWith('+')) {
    cleaned = '+' + cleaned;
  }
  
  return cleaned;
 };

// État pour l'erreur de validation
const [phoneError, setPhoneError] = useState('');

// Gestionnaire de changement pour le champ téléphone
const handlePhoneChange = (value: any) => {
  // Formater la valeur
  const formattedValue = formatPhoneNumber(value);
  
  // Mettre à jour la valeur
  handleProfileInputChange('phone', formattedValue);
  
  // Valider si la valeur n'est pas vide
  if (formattedValue && !validatePhoneNumber(formattedValue)) {
    setPhoneError('Le numéro doit commencer par + suivi du code pays et des chiffres (ex: +33123456789)');
  } else {
    setPhoneError('');
  }
};

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
            <span className="text-blue-200">Bonjour, {userEmail.split('@')[0]}</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-blue-400 text-blue-300 hover:bg-blue-800/50 hover:text-blue-200"
              onClick={handleLogout}
            >
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
                {requests.length === 0 ? (
                  <p className="text-blue-200">Aucune demande de transport pour le moment.</p>
                ) : (
                  requests.map((request) => (
                    <Card key={request.id} className="bg-gradient-to-br from-gray-900 to-blue-950 border-blue-800 shadow-xl">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-white">{request.description}</CardTitle>
                          <Badge 
                            variant={request.status === "MATCHED" ? "default" : "secondary"}
                            className={request.status === "MATCHED" 
                              ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white" 
                              : request.status === "PENDING" 
                                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                                : "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800"
                            }
                          >
                            {request.status === "MATCHED" ? "Accepté" : request.status === "PENDING" ? "En attente" : "Annulé"}
                          </Badge>
                        </div>
                        <CardDescription>
                          <div className="flex items-center space-x-4 text-sm text-blue-300">
                            <span className="flex items-center">
                              <MapPin className="mr-1 h-4 w-4" />
                              {request.origin.city} → {request.destination.city}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="mr-1 h-4 w-4" />
                              {new Date(request.preferredDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <Euro className="mr-1 h-4 w-4" />
                              {request.maxPrice}€
                            </span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-blue-300">{request.offers || 0} offre(s) reçue(s)</span>
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
                  ))
                )}
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-blue-200">Titre de la demande</Label>
                    <Input 
                      id="title" 
                      placeholder="Ex: Transport de meubles" 
                      required 
                      className="bg-gray-800 border-blue-600 text-white placeholder-blue-300 focus:border-blue-400 focus:ring-blue-400"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="originCity" className="text-blue-200">Lieu de départ</Label>
                      <Input 
                        id="originCity" 
                        placeholder="Ville de départ" 
                        required 
                        className="bg-gray-800 border-blue-600 text-white placeholder-blue-300 focus:border-blue-400"
                        value={formData.originCity}
                        onChange={(e) => handleInputChange('originCity', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destinationCity" className="text-blue-200">Lieu d'arrivée</Label>
                      <Input 
                        id="destinationCity" 
                        placeholder="Ville d'arrivée" 
                        required 
                        className="bg-gray-800 border-blue-600 text-white placeholder-blue-300 focus:border-blue-400"
                        value={formData.destinationCity}
                        onChange={(e) => handleInputChange('destinationCity', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="originAddress" className="text-blue-200">Adresse de départ</Label>
                      <Input 
                        id="originAddress" 
                        placeholder="123 Rue de Paris" 
                        required 
                        className="bg-gray-800 border-blue-600 text-white placeholder-blue-300 focus:border-blue-400"
                        value={formData.originAddress}
                        onChange={(e) => handleInputChange('originAddress', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destinationAddress" className="text-blue-200">Adresse d'arrivée</Label>
                      <Input 
                        id="destinationAddress" 
                        placeholder="456 Avenue de Lyon" 
                        required 
                        className="bg-gray-800 border-blue-600 text-white placeholder-blue-300 focus:border-blue-400"
                        value={formData.destinationAddress}
                        onChange={(e) => handleInputChange('destinationAddress', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="originZipcode" className="text-blue-200">Code postal de départ</Label>
                      <Input 
                        id="originZipcode" 
                        placeholder="75001" 
                        required 
                        className="bg-gray-800 border-blue-600 text-white placeholder-blue-300 focus:border-blue-400"
                        value={formData.originZipcode}
                        onChange={(e) => handleInputChange('originZipcode', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destinationZipcode" className="text-blue-200">Code postal d'arrivée</Label>
                      <Input 
                        id="destinationZipcode" 
                        placeholder="69001" 
                        required 
                        className="bg-gray-800 border-blue-600 text-white placeholder-blue-300 focus:border-blue-400"
                        value={formData.destinationZipcode}
                        onChange={(e) => handleInputChange('destinationZipcode', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="originCountry" className="text-blue-200">Pays de départ</Label>
                      <Input 
                        id="originCountry" 
                        placeholder="France" 
                        required 
                        className="bg-gray-800 border-blue-600 text-white placeholder-blue-300 focus:border-blue-400"
                        value={formData.originCountry}
                        onChange={(e) => handleInputChange('originCountry', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destinationCountry" className="text-blue-200">Pays d'arrivée</Label>
                      <Input 
                        id="destinationCountry" 
                        placeholder="France" 
                        required 
                        className="bg-gray-800 border-blue-600 text-white placeholder-blue-300 focus:border-blue-400"
                        value={formData.destinationCountry}
                        onChange={(e) => handleInputChange('destinationCountry', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="originLatitude" className="text-blue-200">Latitude de départ</Label>
                      <Input 
                        id="originLatitude" 
                        type="number" 
                        step="any"
                        placeholder="48.8566" 
                        className="bg-gray-800 border-blue-600 text-white placeholder-blue-300 focus:border-blue-400"
                        value={formData.originLatitude}
                        onChange={(e) => handleInputChange('originLatitude', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destinationLatitude" className="text-blue-200">Latitude d'arrivée</Label>
                      <Input 
                        id="destinationLatitude" 
                        type="number" 
                        step="any"
                        placeholder="45.7640" 
                        className="bg-gray-800 border-blue-600 text-white placeholder-blue-300 focus:border-blue-400"
                        value={formData.destinationLatitude}
                        onChange={(e) => handleInputChange('destinationLatitude', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="originLongitude" className="text-blue-200">Longitude de départ</Label>
                      <Input 
                        id="originLongitude" 
                        type="number" 
                        step="any"
                        placeholder="2.3522" 
                        className="bg-gray-800 border-blue-600 text-white placeholder-blue-300 focus:border-blue-400"
                        value={formData.originLongitude}
                        onChange={(e) => handleInputChange('originLongitude', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destinationLongitude" className="text-blue-200">Longitude d'arrivée</Label>
                      <Input 
                        id="destinationLongitude" 
                        type="number" 
                        step="any"
                        placeholder="4.8357" 
                        className="bg-gray-800 border-blue-600 text-white placeholder-blue-300 focus:border-blue-400"
                        value={formData.destinationLongitude}
                        onChange={(e) => handleInputChange('destinationLongitude', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate" className="text-blue-200">Date souhaitée</Label>
                      <Input 
                        id="preferredDate" 
                        type="date" 
                        required 
                        className="bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="urgency" className="text-blue-200">Urgence</Label>
                      <Select 
                        value={formData.urgency} 
                        onValueChange={(value) => handleInputChange('urgency', value)}
                      >
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
                    <Label htmlFor="description" className="text-blue-200">Description détaillée</Label>
                    <Textarea
                      id="description"
                      placeholder="Décrivez votre marchandise, dimensions, poids, précautions particulières..."
                      rows={4}
                      required
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight" className="text-blue-200">Poids (kg)</Label>
                      <Input 
                        id="weight" 
                        type="number" 
                        placeholder="0" 
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="volume" className="text-blue-200">Volume (m³)</Label>
                      <Input 
                        id="volume" 
                        type="number" 
                        step="0.1" 
                        placeholder="0" 
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                        value={formData.volume}
                        onChange={(e) => handleInputChange('volume', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxPrice" className="text-blue-200">Budget (€)</Label>
                      <Input 
                        id="maxPrice" 
                        type="number" 
                        placeholder="0" 
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                        value={formData.maxPrice}
                        onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dimensions" className="text-blue-200">Dimensions (L,l,H en cm)</Label>
                    <Input 
                      id="dimensions" 
                      placeholder="120,80,100" 
                      className="bg-gray-800 border-blue-600 text-white placeholder-blue-300 focus:border-blue-400"
                      value={formData.dimensions}
                      onChange={(e) => handleInputChange('dimensions', e.target.value)}
                    />
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="fragile"
                        checked={formData.fragile}
                        onChange={(e) => handleInputChange('fragile', e.target.checked)}
                        className="border-blue-600 text-blue-500 focus:ring-blue-400"
                      />
                      <Label htmlFor="fragile" className="text-blue-200">Fragile</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="refrigerated"
                        checked={formData.refrigerated}
                        onChange={(e) => handleInputChange('refrigerated', e.target.checked)}
                        className="border-blue-600 text-blue-500 focus:ring-blue-400"
                      />
                      <Label htmlFor="refrigerated" className="text-blue-200">Réfrigéré</Label>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Publication en cours...
                      </>
                    ) : (
                      <>
                        <Package className="mr-2 h-4 w-4" />
                        Publier la demande
                      </>
                    )}
                  </Button>
                </form>
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
                {isProfileLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                  </div>
                ) : (
                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-blue-200">Prénom</Label>
                        <Input 
                          id="firstName" 
                          name="firstName"
                          value={profileData.firstName}
                          onChange={(e) => handleProfileInputChange('firstName', e.target.value)}
                          className="bg-gray-800 border-blue-600 text-white focus:border-blue-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-blue-200">Nom</Label>
                        <Input 
                          id="lastName" 
                          name="lastName"
                          value={profileData.lastName}
                          onChange={(e) => handleProfileInputChange('lastName', e.target.value)}
                          className="bg-gray-800 border-blue-600 text-white focus:border-blue-400"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-blue-200">Email</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        value={profileData.email}
                        onChange={(e) => handleProfileInputChange('email', e.target.value)}
                        className="bg-gray-800 border-blue-600 text-white focus:border-blue-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-blue-200">
                        Téléphone
                      </Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        value={profileData.phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="+33123456789"
                        className={`bg-gray-800 border-blue-600 text-white focus:border-blue-400 ${
                          phoneError ? 'border-red-500' : ''
                        }`}
                      />
                      {phoneError && (
                        <p className="text-red-400 text-sm mt-1">
                          {phoneError}
                        </p>
                      )}
                      <p className="text-gray-400 text-xs">
                        Format: +[code pays][numéro] (ex: +33123456789, +212612345678)
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-blue-200">Adresse</Label>
                      <Input 
                        id="address" 
                        name="address"
                        value={profileData.address}
                        onChange={(e) => handleProfileInputChange('address', e.target.value)}
                        className="bg-gray-800 border-blue-600 text-white focus:border-blue-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-blue-200">Nouveau mot de passe (optionnel)</Label>
                      <Input 
                        id="password" 
                        name="password"
                        type="password"
                        placeholder="Laissez vide pour ne pas modifier"
                        value={profileData.password}
                        onChange={(e) => handleProfileInputChange('password', e.target.value)}
                        className="bg-gray-800 border-blue-600 text-white placeholder-blue-300 focus:border-blue-400"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                      disabled={isProfileLoading}
                    >
                      {isProfileLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sauvegarde en cours...
                        </>
                      ) : (
                        'Sauvegarder'
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}