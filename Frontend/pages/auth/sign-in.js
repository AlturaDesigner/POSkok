import Head from 'next/head';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignIn() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (result.ok) {
      router.replace('/');
      return;
    }
    alert('Credential is not valid');
  };

  return (
    <div  class="signin-main">
       
      <Head>
        <title>Strapi - Next - NextAuth</title>
      </Head>
      <div class="signin-card">
      <p >DOBRODOSLI U</p>
      <img src="http://designersnfts.com:1337/uploads/poskok_red_2395a142e9.png?updated_at=2022-09-17T21:38:49.133Z" class="logos"></img>
        <p>POSKOK - POS</p>
        <p>Kompletno rešenje za poslovanje pravnih lica i preduzetnika</p>
     
      <form  onSubmit={onSubmit}>
        <label htmlFor="email"></label>
        <input id="email" name="email" type="email"  placeholder="EMAIL ADRESA"/>
        <label
          style={{
            marginTop: 10,
          }}
          htmlFor="password"
        >
          
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="SIFRA"
          
        />
        <button
          style={{
            marginTop: 15,
          }}
        >
          PRIJAVA NA SISTEM
        </button>
      </form>
      <script>
        
      </script>
      </div>
    </div>
  );
}