"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Truck, Package, Eye, EyeOff, Loader2 } from "lucide-react"
import { Navigate, useNavigate } from "react-router-dom"


interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    type: 'client' | 'transporter';
    status: 'active' | 'inactive' | 'pending';
  };
}

interface LoginError {
  message: string;
  statusCode?: number;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<"client" | "transporter">("client")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  
  const navigate = useNavigate()

  const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const errorData: LoginError = await response.json()
      throw new Error(errorData.message || 'Erreur de connexion')
    }

    return response.json()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      
      if (!email || !password) {
        throw new Error('Veuillez remplir tous les champs')
      }

     
      const loginResponse = await loginUser(email, password)
      
      
      if (loginResponse.user.status !== 'active') {
        let statusMessage = ''
        switch (loginResponse.user.status) {
          case 'inactive':
            statusMessage = 'Votre compte est désactivé. Contactez l\'administrateur.'
            break
          case 'pending':
            statusMessage = 'Votre compte est en attente d\'activation.'
            break
          default:
            statusMessage = 'Votre compte n\'est pas actif.'
        }
        throw new Error(statusMessage)
      }

     
      if (loginResponse.user.type !== userType) {
        throw new Error(`Ce compte n'est pas un compte ${userType === 'client' ? 'client' : 'transporteur'}`)
      }

      
      localStorage.setItem('accessToken', loginResponse.accessToken)
      localStorage.setItem('userType', loginResponse.user.type)
      localStorage.setItem('userId', loginResponse.user.id)

      
      if (loginResponse.user.type === 'transporter') {
        navigate("/transporter-dashboard")
      } else {
        navigate('/client-dashboard')
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur inattendue s\'est produite')
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
          <h1 className="text-3xl font-bold text-white mb-2">Connexion</h1>
          <p className="text-blue-200">Accédez à votre compte</p>
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
              {error && (
                <Alert className="bg-red-900/50 border-red-500/50 text-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-200">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="votre@email.com" 
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-200">Mot de passe</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 pr-10"
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-slate-600/50 text-slate-400 hover:text-blue-300 transition-all duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer transition-colors duration-200 hover:underline">
                  Mot de passe oublié ?
                </span>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>
            
            <div className="pt-4 text-center border-t border-slate-700/50">
              <p className="text-sm text-slate-400">
                Pas encore de compte ?{" "}
                <a href="/register" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline font-medium">
                  S'inscrire
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}