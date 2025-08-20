
type Rote = [string , string , number]
type Jos = {
  name: string,
  nor: (m: string)=> void
}
export default function Home() {

  const item: Rote = ["hello", "hello", 2];
  const jos: Jos = {
    name: "jos",
    nor: (g) => console.log("nothing", g)
  }
  
  return (
    <div >
        {
          jos.name 
        
        }{
          item[0]

        }
    </div>
  );
}
