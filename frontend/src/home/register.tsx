"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Truck, Package, Eye, EyeOff, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

// Types pour les données de formulaire
interface BaseUserData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
}

interface ClientData extends BaseUserData {
  type: "client"
  address: string
}

interface TransporterData extends BaseUserData {
  type: "transporter"
  licenseNumber: string
  licenseExpiry: string
  insuranceNumber: string
}

type UserRegistrationData = ClientData | TransporterData

// Service API
class AuthService {
  private static getBaseUrl(): string {
    return process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3001' 
      : 'https://votre-api-prod.com'
  }

  static async register(userData: UserRegistrationData): Promise<{ data: any, status: number }> {
    console.log('Données envoyées:', userData)
    console.log('URL:', `${this.getBaseUrl()}/auth/signup`)

    const response = await fetch(`${this.getBaseUrl()}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    console.log('Status:', response.status)
    console.log('Response headers:', response.headers)

    if (!response.ok) {
      let error
      try {
        error = await response.json()
        console.log('Erreur du serveur:', error)
      } catch (e) {
        error = { message: `HTTP ${response.status}: ${response.statusText}` }
      }
      throw new Error(error.message || 'Erreur lors de l\'inscription')
    }

    const data = await response.json()
    return { data, status: response.status }
  }
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<"client" | "transporter">("client")
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    licenseNumber: '',
    licenseExpiry: '',
    insuranceNumber: ''
  })
  const navigate = useNavigate()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = (): boolean => {
    const { firstName, lastName, email, phone, password } = formData

    if (!firstName || !lastName || !email || !phone || !password) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return false
    }

    if (!acceptTerms) {
      toast.error('Veuillez accepter les conditions d\'utilisation')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Format d\'email invalide')
      return false
    }

    if (password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères')
      return false
    }

    if (userType === 'client' && !formData.address) {
      toast.error('L\'adresse est obligatoire pour les clients')
      return false
    }

    if (userType === 'transporter') {
      const { licenseNumber, licenseExpiry, insuranceNumber } = formData
      if (!licenseNumber || !licenseExpiry || !insuranceNumber) {
        toast.error('Tous les champs transporteur sont obligatoires')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const userData: UserRegistrationData = userType === 'client'
        ? {
            email: formData.email.trim(),
            password: formData.password,
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            phone: formData.phone.trim(),
            type: 'client',
            address: formData.address.trim()
          }
        : {
            email: formData.email.trim(),
            password: formData.password,
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            phone: formData.phone.trim(),
            type: 'transporter',
            licenseNumber: formData.licenseNumber.trim(),
            licenseExpiry: formData.licenseExpiry,
            insuranceNumber: formData.insuranceNumber.trim()
          }

      const { data, status } = await AuthService.register(userData)
      
      if (status === 201) {
        toast.success('Inscription réussie ! Redirection vers la page de connexion...')
        setTimeout(() => {
          navigate('/login')
        }, 1500)
      } else {
        toast.info('Inscription réussie ! Vérifiez votre email pour activer votre compte.')
      }
    } catch (error: any) {
      console.error('Erreur lors de l\'inscription:', error)
      toast.error(error.message || 'Erreur lors de l\'inscription')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4 cursor-pointer group">
            <Truck className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
            <span className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors duration-200">TransportEasy</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Inscription</h1>
          <p className="text-blue-200">Créez votre compte</p>
        </div>

        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm shadow-2xl">
          <CardHeader className="pb-4">
            <Tabs value={userType} onValueChange={(value) => setUserType(value as "client" | "transporter")}>
              <TabsList className="grid w-full grid-cols-2 bg-slate-700/50 border-slate-600">
                <TabsTrigger 
                  value="client" 
                  className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300 hover:text-white transition-all duration-200 hover:bg-slate-600"
                >
                  <Package className="h-4 w-4" />
                  <span>Client</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="transporter" 
                  className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300 hover:text-white transition-all duration-200 hover:bg-slate-600"
                >
                  <Truck className="h-4 w-4" />
                  <span>Transporteur</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-blue-200">Prénom *</Label>
                  <Input 
                    id="firstName" 
                    placeholder="Jean" 
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-blue-200">Nom *</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Dupont" 
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-200">Email *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="votre@email.com" 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-blue-200">Téléphone *</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="06 12 34 56 78" 
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                  required 
                />
              </div>

              {userType === "client" && (
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-blue-200">Adresse *</Label>
                  <Input 
                    id="address" 
                    placeholder="Votre adresse complète" 
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                    required 
                  />
                </div>
              )}

              {userType === "transporter" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber" className="text-blue-200">Numéro de licence *</Label>
                    <Input 
                      id="licenseNumber" 
                      placeholder="Numéro de licence transport" 
                      value={formData.licenseNumber}
                      onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licenseExpiry" className="text-blue-200">Date d'expiration licence *</Label>
                    <Input 
                      id="licenseExpiry" 
                      type="date" 
                      value={formData.licenseExpiry}
                      onChange={(e) => handleInputChange('licenseExpiry', e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insuranceNumber" className="text-blue-200">Numéro d'assurance *</Label>
                    <Input 
                      id="insuranceNumber" 
                      placeholder="Numéro d'assurance transport" 
                      value={formData.insuranceNumber}
                      onChange={(e) => handleInputChange('insuranceNumber', e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                      required 
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-200">Mot de passe *</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 pr-10"
                    required 
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-slate-600/50 text-slate-400 hover:text-blue-300 transition-all duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label htmlFor="terms" className="text-sm text-slate-300">
                  J'accepte les{" "}
                  <span className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors duration-200 hover:underline">
                    conditions d'utilisation
                  </span>
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Inscription en cours...
                  </>
                ) : (
                  'Créer mon compte'
                )}
              </Button>
            </form>

            <div className="pt-4 text-center border-t border-slate-700/50">
              <p className="text-sm text-slate-400">
                Déjà un compte ?{" "}
                <a href="/login" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline font-medium">
                  Se connecter
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}