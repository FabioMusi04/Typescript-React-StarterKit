import { useEffect, useState } from "react";
import { IAlertProps } from "../../ts/types";
import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../components/Alert";

export default function DetailsPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, /* setAlert */] = useState<IAlertProps>({
    message: "",
    type: "success",
    onClose: () => {},
  })

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full min-h-screen bg-primary">
      <Alert {...alert} />
    </div>
  );
}
