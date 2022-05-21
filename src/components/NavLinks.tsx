import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { category: "all", label: "Todos os produtos" },
  { category: "t-shirts", label: "Camisetas" },
  { category: "mugs", label: "Canecas" },
];

export function NavLinks() {
  const { query } = useRouter();

  return (
    <nav className="flex">
      <ul className="flex gap-4">
        {links.map((link) => (
          <li
            key={link.label}
            className={
              query.category === link.category
                ? "border-b-2 border-[#FFA585]"
                : ""
            }
          >
            <Link href={`/?page=0&category=${link.category}`}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
