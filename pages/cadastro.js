import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginCard from "../src/components/loginCard/loginCard";
import styles from "../styles/Login.module.css";
import Input from "../src/components/input/input";
import Button from "../src/components/button/button";
import Image from "next/image";

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    date: "",
    password: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleFormEdit = (event, name) => {
    setFormData({ ...formData, [name]: event.target.value });
  };

  const handleForm = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch("/api/user/cadastro", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const json = await response.json();
      if (response.status !== 201) throw new Error(json);

      setCookie("authorization", json);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className={styles.background}>
      <div className={styles.imageContainer}>
        <Image
          src="/images/logofundotransparente.png"
          alt="Logo"
          width={400}
          height={400}
        />
        <Link href="/sobrenos">
          <Button className={styles.sobreNosButton}>Sobre nós</Button>
        </Link>
      </div>
      <LoginCard title={"Criar uma nova conta"}>
        <form onSubmit={handleForm} className={styles.form}>
          <Input
            type="email"
            placeholder="Seu e-mail"
            required
            value={formData.email}
            onChange={(e) => {
              handleFormEdit(e, "email");
            }}
          />
          <Input
            type="text"
            placeholder="Nome de usuário"
            required
            value={formData.name}
            onChange={(e) => {
              handleFormEdit(e, "name");
            }}
          />
          <Input
            type="date"
            placeholder=""
            required
            value={formData.date}
            onChange={(e) => {
              handleFormEdit(e, "date");
            }}
          />
          <Input
            type="password"
            placeholder="Sua senha"
            required
            value={formData.password}
            onChange={(e) => {
              handleFormEdit(e, "password");
            }}
          />
          {error && <p className={styles.error}>{error}</p>}
          <Button>Cadastrar e Entrar</Button>
          <Link href="/login">Já possui uma conta?</Link>
        </form>
      </LoginCard>
    </div>
  );
}
