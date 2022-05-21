import { useShoppingCart } from "../hooks/useShoppingCart";
import { formatPrice } from "../utils";

const links = [
  "ajuda",
  "reembolsos",
  "entregas e frete",
  "trocas e devoluções",
];

export function OrderSummary() {
  const { totalPrice, products, handleFinishOrder } = useShoppingCart();
  return (
    <div className="flex flex-col justify-between items-start h-[calc(100vh-90px)] bg-white  sticky top-[4rem] p-4">
      <div className="text-[#41414D] text-lg flex flex-col gap-2 w-[100%]">
        <h2 className="font-semibold text-2xl text-[#41414D]">
          RESUMO DO PEDIDO
        </h2>
        <div className="flex justify-between">
          <span>Subtotal de produtos</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between ">
          <span>Entrega </span>
          <div>
            {totalPrice / 100 > 900 && <span className="mr-2">R$ 0,00</span>}
            <span
              className={`${
                totalPrice / 100 > 900 && "line-through opacity-50"
              }`}
            >
              R$ 40,00
            </span>
          </div>
        </div>
        <div className="flex justify-between relative mt-2 font-semibold text-[#41414D] after:content-[''] after:absolute after:block after:bg-[#DCE2E5] after:h-[1px] after:w-[90%] after:left-1/2 after:-translate-x-1/2 after:top-[-20%]">
          <span>Total</span>
          <span>
            {formatPrice(
              totalPrice / 100 > 900 ? totalPrice : totalPrice + 4000
            )}
          </span>
        </div>
        <button
          className="bg-[#51B853] w-[100%] p-2 mt-10 rounded-md text-white font-semibold text-base disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={products.length === 0}
          onClick={handleFinishOrder}
        >
          FINALIZAR A COMPRA
        </button>
      </div>
      <ul>
        {links.map((link) => (
          <li key={link}>
            <a className="uppercase underline text-[#737380]" href="">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
