
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Truck, MapPin, Calendar, Euro, Package, Star, MessageCircle, CheckCircle, Plus } from 'lucide-react';

// Define interfaces for Request and Offer
interface Request {
  id: number;
  title: string;
  from: string;
  to: string;
  date: string;
  budget: string;
  weight: string;
  volume: string;
  description: string;
  client: string;
  rating: number;
  distance: string;
  createdAt: string;
}

interface Offer {
  id: number;
  requestTitle: string;
  myPrice: string;
  status: string;
  client: string;
  date: string;
}

export default function TransporterDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('available');
  const [requests, setRequests] = useState<Request[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [token, setToken] = useState(localStorage.getItem('accessToken') || '');
  const [cityFilter, setCityFilter] = useState('');
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [offerPrice, setOfferPrice] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Charger les demandes disponibles
  const fetchRequests = async (city = ''): Promise<void> => {
    if (!token) {
      setError('Aucun token trouvé. Veuillez vous connecter.');
      navigate('/login');
      return;
    }
    try {
      console.log('Fetching requests with token:', token);
      const response = await fetch(`http://localhost:3001/shipments/available${city ? `?city=${city}` : ''}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        console.log('Unauthorized: Invalid or expired token');
        setError('Session expirée. Veuillez vous reconnecter.');
        localStorage.removeItem('accessToken');
        setToken('');
        navigate('/login');
        return;
      }
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      console.log('Requests data:', data);
      setRequests(
        data.map((request: any) => ({
          id: request.id,
          title: request.description || 'Transport',
          from: request.origin.city,
          to: request.destination.city,
          date: new Date(request.preferredDate).toISOString().split('T')[0],
          budget: `${request.maxPrice}€`,
          weight: `${request.weight}kg`,
          volume: `${request.volume}m³`,
          description: request.description,
          client: `${request.client.firstName} ${request.client.lastName}`,
          rating: request.client.rating || 0,
          distance: request.distance,
          createdAt: request.createdAt,
        })),
      );
      setError(null);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setError('Erreur lors du chargement des demandes.');
    }
  };

  // Charger les offres du transporteur
  const fetchOffers = async (): Promise<void> => {
    if (!token) {
      setError('Aucun token trouvé. Veuillez vous connecter.');
      navigate('/login');
      return;
    }
    try {
      console.log('Fetching offers with token:', token);
      const response = await fetch('http://localhost:3001/shipments/offers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        console.log('Unauthorized: Invalid or expired token');
        setError('Session expirée. Veuillez vous reconnecter.');
        localStorage.removeItem('accessToken');
        setToken('');
        navigate('/login');
        return;
      }
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      console.log('Offers data:', data);
      setOffers(
        data.map((offer: any) => ({
          id: offer.id,
          requestTitle: offer.shipmentRequest?.description || offer.description || 'Transport',
          myPrice: `${(offer.pricePerKg * offer.availableWeight).toFixed(2)}€`,
          status: offer.status === 'PENDING' ? 'En attente' : offer.status === 'ACCEPTED' ? 'Accepté' : offer.status,
          client: offer.shipmentRequest?.client
            ? `${offer.shipmentRequest.client.firstName} ${offer.shipmentRequest.client.lastName}`
            : 'Client inconnu',
          date: new Date(offer.departureDate).toISOString().split('T')[0],
        })),
      );
      setError(null);
    } catch (error) {
      console.error('Error fetching offers:', error);
      setError('Erreur lors du chargement des offres.');
    }
  };

  // Soumettre une offre
  const submitOffer = async (): Promise<void> => {
    if (!selectedRequestId || !offerPrice) return;
    if (!token) {
      setError('Aucun token trouvé. Veuillez vous connecter.');
      navigate('/login');
      return;
    }
    try {
      console.log('Submitting offer for request:', selectedRequestId, 'with price:', offerPrice);
      const response = await fetch('http://localhost:3001n/shipments/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shipmentRequestId: selectedRequestId,
          pricePerKg: parseFloat(offerPrice),
          description: 'Offre pour transport',
        }),
      });
      if (response.status === 401) {
        console.log('Unauthorized: Invalid or expired token');
        setError('Session expirée. Veuillez vous reconnecter.');
        localStorage.removeItem('accessToken');
        setToken('');
        navigate('/login');
        return;
      }
      if (!response.ok) {
        throw new Error(`Offer submission failed with status ${response.status}`);
      }
      setIsOfferDialogOpen(false);
      setOfferPrice('');
      fetchRequests(cityFilter);
      fetchOffers();
      alert('Offre soumise avec succès');
      setError(null);
    } catch (error) {
      console.error('Error submitting offer:', error);
      setError('Erreur lors de la soumission de l’offre.');
    }
  };

  useEffect(() => {
    if (!token) {
      setError('Aucun token trouvé. Veuillez vous connecter.');
      navigate('/login');
      return;
    }
    if (activeTab === 'available') {
      fetchRequests(cityFilter);
    } else if (activeTab === 'my-offers') {
      fetchOffers();
    }
  }, [activeTab, token, cityFilter, navigate]);

  return (
    <div className="min-h-screen bg-gray-900">
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
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => {
                localStorage.removeItem('accessToken');
                setToken('');
                setRequests([]);
                setOffers([]);
                setError(null);
                navigate('/login');
              }}
            >
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-600 text-white rounded-md">
            {error}
          </div>
        )}
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
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={() => fetchRequests(cityFilter)}
                  >
                    Filtrer
                  </Button>
                </div>
              </div>

              <div className="grid gap-6">
                {requests.map((request) => (
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
                          <div className="text-sm text-gray-400">
                            Publié {new Date(request.createdAt).toLocaleString()}
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                            >
                              <MessageCircle className="mr-2 h-4 w-4" />
                              Contacter
                            </Button>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                              onClick={() => {
                                setSelectedRequestId(request.id);
                                setIsOfferDialogOpen(true);
                              }}
                            >
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
                {offers.map((offer) => (
                  <Card key={offer.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-white">{offer.requestTitle}</CardTitle>
                        <Badge
                          variant={offer.status === 'Accepté' ? 'default' : 'secondary'}
                          className={offer.status === 'Accepté' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-200'}
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
                          {offer.status === 'Accepté' ? (
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Voir les détails
                            </Button>
                          ) : (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                              >
                                Modifier l’offre
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                              >
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
                  <CardTitle className="text-white">Informations de l’entreprise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-gray-300">Nom de l’entreprise</Label>
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
                      <Label htmlFor="description" className="text-gray-300">Description de l’entreprise</Label>
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Modifier
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter un véhicule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={isOfferDialogOpen} onOpenChange={setIsOfferDialogOpen}>
          <DialogContent className="bg-gray-800 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>Faire une offre</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pricePerKg" className="text-gray-300">Prix par kg (€)</Label>
                <Input
                  id="pricePerKg"
                  type="number"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                  placeholder="Entrez votre prix par kg"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => setIsOfferDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={submitOffer}
                disabled={!offerPrice}
              >
                Soumettre
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
