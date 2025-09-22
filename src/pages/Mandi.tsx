import MandiLive from "../components/MandiCall";
import Navbar from "@/components/navbar";

function Mandi() {
  return (<>
  <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cyan-50 py-8">
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Farmer Query Portal
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get real-time mandi prices from across India. Search for specific crops, 
            sort by price, and stay updated with the latest market rates.
          </p>
        </div>
        
        <MandiLive 
          apiKey="579b464db66ec23bdd00000128aa160d8d7949195f3d7bfcc860917f"
          refreshInterval={5 * 60 * 1000} 
        />
      </div>
    </div>
    </>
  );
}

export default Mandi;