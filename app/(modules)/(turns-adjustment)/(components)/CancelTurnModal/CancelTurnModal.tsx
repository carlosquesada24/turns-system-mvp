import { useForm } from "@/app/(hooks)/useForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CancelTurnModal() {
  const clientName = "Iron man";

  const { values: formValues, handleInputChange } = useForm(
    { clientName: "" },
    {}
  );

  const isContinueButtonDisabled = formValues.clientName !== clientName;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Cancelar turno</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Si continúa, no hay vuelta atrás
          </AlertDialogDescription>
          <AlertDialogDescription>
            Digite su nombre: "Iron man" para cancelar turno
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <Input
            id="clientName"
            type="text"
            onChange={(e) =>
              handleInputChange("clientName", e.currentTarget.value)
            }
            placeholder="Carlos"
            value={formValues.clientName}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Volver atrás</AlertDialogCancel>
          <AlertDialogAction disabled={isContinueButtonDisabled}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
