import ItemsStatusReview from "@/components/dashboard/admin/ItemsStatusReview";
import { actionGetAllItemsForReview } from "@/lib/actions/admin";


export default async function Page() {
  // Fetch data on the server
  const response = await actionGetAllItemsForReview(1);
  
  return <ItemsStatusReview initialData={response.data} initialMeta={response.meta} />;
}