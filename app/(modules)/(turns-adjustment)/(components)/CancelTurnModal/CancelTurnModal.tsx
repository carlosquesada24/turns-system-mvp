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

interface CancelTurnModalProps {
  clientName: string;
}

export function CancelTurnModal({ clientName }: CancelTurnModalProps) {
  const {
    values: formValues,
    handleInputChange,
    reset,
  } = useForm({ clientName: "" }, {});

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
            Digite su nombre: "{clientName}" para cancelar turno
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <Input
            id="clientName"
            type="text"
            onChange={(e) =>
              handleInputChange("clientName", e.currentTarget.value)
            }
            placeholder="Su nombre"
            value={formValues.clientName}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => reset()}>
            Volver atrás
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => reset()}
            disabled={isContinueButtonDisabled}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
