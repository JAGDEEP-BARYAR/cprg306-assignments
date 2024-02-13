export default function Item({name, quantity, category}) {
    return(
    <main>
        <h1 className="text-xl font-bold" >{name}</h1>
        <p className="text-sm">Buy {quantity} in {category}</p>
    </main>
      
    );
  };