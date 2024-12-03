import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function Claim() {
  const navigate = useNavigate();
  const goBack = () => navigate("/");
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://form.jotform.com/jsform/243371780455359";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
      const iframe = document.getElementById("243371780455359");
      if (iframe) {
        iframe.remove();
      }
    };
  }, []);

  return (
    <div>
      <Button onClick={goBack}>Back to Dashboard</Button>
      <div id="jotform-container">{/* Embed form */}</div>
    </div>
  );
}

export default Claim;
