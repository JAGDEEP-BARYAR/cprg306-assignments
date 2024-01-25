import ItemList from './item-list.js';
export default function Page() {
       return (
        <main className="custom-item mx-4 my-4 p-3 bg-custom">
            <h1 className="text-3xl font-bold m-2">Shopping List</h1>
            <ItemList />
        </main>
       )
}