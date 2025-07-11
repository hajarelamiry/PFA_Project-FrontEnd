import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Package, Shield, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Truck className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">TransportEasy</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-gray-300 hover:text-blue-400 transition-colors">
              Services
            </a>
            <a href="#how-it-works" className="text-gray-300 hover:text-blue-400 transition-colors">
              Comment ça marche
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-blue-400 transition-colors">
              Tarifs
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/login">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700">Connexion</Button>
            </Link>
            <Link to="/register">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">S'inscrire</Button>
          </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold text-white mb-6">
            Transport de marchandises <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">simplifié</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connectez-vous avec des transporteurs fiables pour expédier vos marchandises en toute sécurité, rapidement
            et au meilleur prix.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/client-dashboard">
            <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all">
              <Package className="mr-2 h-5 w-5" />
              Expédier un colis
            </Button>
            </Link>
            <Link to="/transporter-dashboard">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all">
              <Truck className="mr-2 h-5 w-5" />
              Devenir transporteur
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 bg-gray-800/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Nos Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-800/80 border-gray-700 hover:bg-gray-700/80 transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <Package className="h-12 w-12 text-blue-400 mb-4" />
                <CardTitle className="text-white">Expédition Express</CardTitle>
                <CardDescription className="text-gray-300">Livraison rapide pour vos colis urgents</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Livraison en 24-48h</li>
                  <li>• Suivi en temps réel</li>
                  <li>• Assurance incluse</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/80 border-gray-700 hover:bg-gray-700/80 transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <Truck className="h-12 w-12 text-blue-400 mb-4" />
                <CardTitle className="text-white">Transport Standard</CardTitle>
                <CardDescription className="text-gray-300">Solution économique pour vos envois réguliers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Livraison en 3-5 jours</li>
                  <li>• Tarifs compétitifs</li>
                  <li>• Transporteurs vérifiés</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/80 border-gray-700 hover:bg-gray-700/80 transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-400 mb-4" />
                <CardTitle className="text-white">Transport Sécurisé</CardTitle>
                <CardDescription className="text-gray-300">Pour vos marchandises de valeur</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Assurance premium</li>
                  <li>• Transporteurs certifiés</li>
                  <li>• Suivi GPS</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Comment ça marche</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Publiez votre demande</h3>
              <p className="text-gray-300">Décrivez votre colis et vos besoins de transport</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Recevez des offres</h3>
              <p className="text-gray-300">Les transporteurs vous proposent leurs services</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Choisissez et expédiez</h3>
              <p className="text-gray-300">Sélectionnez la meilleure offre et suivez votre colis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">10,000+</div>
              <div className="text-blue-200">Colis expédiés</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">500+</div>
              <div className="text-blue-200">Transporteurs actifs</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">98%</div>
              <div className="text-blue-200">Satisfaction client</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">24/7</div>
              <div className="text-blue-200">Support client</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-800/50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Prêt à commencer ?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Rejoignez des milliers d'utilisateurs qui font confiance à TransportEasy
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all">
            Commencer maintenant
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Truck className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold text-white">TransportEasy</span>
              </div>
              <p className="text-gray-400">La plateforme de référence pour le transport de marchandises</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Transport express</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Transport standard</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Transport sécurisé</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Centre d'aide</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Contact</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">FAQ</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Légal</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Conditions d'utilisation</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Politique de confidentialité</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Mentions légales</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TransportEasy. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}