import Link from "next/link";
import LoginCard from "../src/components/loginCard/loginCard";
import styles from "../styles/Login.module.css";
import Input from "../src/components/input/input";
import Button from "../src/components/button/button";
import Image from "next/image";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleFormEdit = (event, name) => {
    setFormData({ ...formData, [name]: event.target.value });
  }

  const handleForm = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const json = await response.json();
      if (response.status !== 200) throw new Error(json);

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
      <LoginCard title={"Entre em sua conta"}>
        <form className={styles.form} onSubmit={handleForm}>
          <Input type="email" placeholder="Seu e-mail" value={formData.email} required onChange={(e) => {handleFormEdit(e,'email')}}/>
          <Input type="password" placeholder="Sua senha" value={formData.password} required onChange={(e) => {handleFormEdit(e,'password')}}/>
          {error && <p className={styles.error}>{error}</p>}
          <Button>Entrar</Button>
          <Link href="/cadastro">Ainda não possui conta? Clique aqui</Link>
        </form>
      </LoginCard>
    </div>
  );
}
