import { redirect } from 'next/navigation'

// "Sign up" is the register page. Keep /signup working as an alias.
export default function SignupPage() {
  redirect('/register')
}
