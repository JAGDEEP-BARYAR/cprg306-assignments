export default function Item({name, quantity, category}) {
    return(
    <main>
         <div className="custom-item mx-4 my-4 p-3 bg-custom">
            <h2 className="custom-heading text-lg font-bold text-custom-heading-color">{name}</h2>
            <p className="text-sm">Buy {quantity} in {category}  </p>
        </div>
    </main>
      
    );
    
  };