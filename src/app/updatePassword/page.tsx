"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import logoUNAPAM from "@/resources/LogoColorful.png";
import Image from "next/image";
import { GoKey } from "react-icons/go";
import { useUsersStore } from "@/store/usersStore";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function UpdatePassword() {
  const { putUserPassword, currentUser } = useUsersStore();
  const router = useRouter();

  const [data, setData] = useState({
    email: currentUser?.email || "",
    password: "",
    confirmedPassword: "",
  });

  useEffect(() => {
    if (currentUser) {
      setData((prevData) => ({ ...prevData, email: currentUser.email }));
    }
  }, [currentUser]);

  const renewPassword = async () => {
    /*if (!currentUser) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se ha encontrado el usuario actual. Por favor, intenta iniciar sesión nuevamente.",
      });
      return;
    }*/

    if (data.password !== data.confirmedPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden. Por favor, inténtalo de nuevo.",
      });
      return;
    }

    try {
      const updatedUser = await putUserPassword(currentUser.id, {
        email: data.email,
        password: data.password,
      });

      if (updatedUser) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Contraseña actualizada correctamente",
        });
        router.push("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al actualizar la contraseña. Por favor, inténtalo de nuevo.",
        });
      }
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al actualizar la contraseña. Por favor, inténtalo de nuevo.",
      });
    }
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, password: e.target.value });
  };

  const handlePasswordConfirmedChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setData({ ...data, confirmedPassword: e.target.value });
  };

  return (
    <div className="bg-light-gray h-screen flex items-center">
      <div className="container grid grid-cols-3 items-center mx-auto max-w-3xl">
        <div className="col-span-1 grid grid-col-2">
          <div className="container bg-white p-4 flex flex-col items-center rounded-l-3xl">
            <p className="text-2xl font-bold text-medium-gray text-center">
              Recuperación de contraseña
            </p>
            <Image src={logoUNAPAM} alt="logoUNAPAM" className="w-64 h-auto" />
          </div>
        </div>
        <div className="col-span-2">
          <div className="container bg-gray-gradient px-10 py-20 rounded-3xl">
            <InputField
              value={data.password}
              onChange={handleNewPasswordChange}
              label="Nueva contraseña"
              placeholder="Contraseña"
              type="password"
              iconStart={<GoKey color="white" />}
            />
            <InputField
              value={data.confirmedPassword}
              onChange={handlePasswordConfirmedChange}
              label="Confirmar contraseña"
              placeholder="Contraseña"
              type="password"
              iconStart={<GoKey color="white" />}
            />
            <div className="flex justify-center mt-24">
              <Button
                className="bg-dark-red w-full max-w-md"
                onClick={renewPassword}
              >
                Actualizar contraseña
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
