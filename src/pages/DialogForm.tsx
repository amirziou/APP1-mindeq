import Formulaire from "../formulaire/Formulaire";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { FormEvent, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  client: z
    .string()
    .min(1, { message: "Nom client must be at least 1 characters!!" }),

  Reference: z
    .string()
    .min(1, { message: "Reference must be at least 1 characters!!" }),

  qte: z.number().min(1, { message: "Quantité must be at least 1!!" }),

  faible: z.number().min(1),
  moyenne: z.number().min(1),
  bonne: z.number().min(1),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: FieldValues) => void;
}

const DialogForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  //   const onSubmit = (data: FieldValues) => {
  // console.log(data);
  // onClose();
  //   };

  const { isOpen, onOpen, onClose } = useDisclosure();
  // const cancelRef = React.useRef()
  const cancelRef = useRef(null);

  const handleFormSubmit = (data: FieldValues) => {
    // Call both onSubmit and onClose functions
    onSubmit(data);
    onClose();
    reset();
  };

  return (
    <>
      <Button onClick={onOpen}>Ajouter une Production</Button>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size="3xl"
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Ajouter </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="my-3 mx-3">
                <label htmlFor="client" className="form-label">
                  {" "}
                  Client{" "}
                </label>
                <input
                  {...register("client")}
                  id="client"
                  type="text"
                  className="form-control"
                  placeholder="Entrez le nom de client"
                  aria-label="client"
                />
                {errors.client && (
                  <p className="text-danger"> {errors.client.message} </p>
                )}
              </div>
              <div className="my-3 mx-3">
                <label htmlFor="Reference" className="form-label">
                  {" "}
                  Référence{" "}
                </label>
                <input
                  {...register("Reference")}
                  id="Reference"
                  type="text"
                  className="form-control"
                  placeholder="Entrez la référence"
                  aria-label="Reference"
                />
                {errors.Reference && (
                  <p className="text-danger"> {errors.Reference.message} </p>
                )}
              </div>

              <div className="my-3 mx-3">
                <label htmlFor="qte" className="form-label">
                  Quantité
                </label>
                <input
                  {...register("qte", { valueAsNumber: true })}
                  id="qte"
                  type="number"
                  className="form-control"
                  placeholder="Entrez la quantitée a produire"
                  aria-label="client"
                />
                {errors.qte && (
                  <p className="text-danger"> {errors.qte.message} </p>
                )}
              </div>
              <label
                style={{
                  marginTop: "30px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#696969",
                }}
              >
                Limites de Production
              </label>
              <div className="my-2 mx-2 row g-3 ">
                <div className="col">
                  <label htmlFor="Production faible" className="form-label">
                    Production faible
                  </label>
                  <input
                    {...register("faible", { valueAsNumber: true })}
                    id="faible"
                    type="number"
                    className="form-control"
                    placeholder="Production faible"
                    aria-label="faible"
                  />
                </div>
                <div className="col">
                  <label htmlFor="Production moyenne" className="form-label">
                    Production moyenne
                  </label>
                  <input
                    {...register("moyenne", { valueAsNumber: true })}
                    id="moyenne"
                    type="number"
                    className="form-control"
                    placeholder="Production moyenne"
                    aria-label="moyenne"
                  />
                </div>
                <div className="col">
                  <label htmlFor="Production bonne" className="form-label">
                    Production bonne
                  </label>
                  <input
                    {...register("bonne", { valueAsNumber: true })}
                    id="bonne"
                    type="number"
                    className="form-control"
                    placeholder="Production bonne"
                    aria-label="bonne"
                  />
                </div>
              </div>

              <div
                className="my-4 mx-3"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button className="btn btn-light" onClick={onClose}>
                  Annuler
                </button>
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{ marginLeft: "10px" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </AlertDialogBody>
          {/* <AlertDialogFooter> */}
          {/* <button ref={cancelRef} onClick={onClose}>
                Annuler
              </button>
              <button className="btn btn-primary" type="submit">
                Submit
              </button> */}
          {/* <button className="btn btn-light">Annuler</button> */}
          {/* </AlertDialogFooter> */}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DialogForm;
