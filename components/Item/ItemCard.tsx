import { LuPlusSquare } from "react-icons/lu";
import { Item } from "../../@generated/src";
import { useAppDispatch } from "../../redux/hooks";
import { addItem } from "../../redux/slices/cartSlice";
import Button from "../Button/Button";
import Placeholder from "../Placeholder/Placeholder";
import styles from "./ItemCard.module.css";

interface Props {
  item: Item;
}

export default function ItemCard({ item }: Props) {
  const dispatch = useAppDispatch();

  const { id, name, description, price } = item;
  return (
    <div className={styles.card}>
      <Placeholder width={100} height={100} />
      <div className={styles.cardData}>
        <div className={styles.itemData}>
          <span className={styles.name}>{name}</span>
          <span className={styles.description}>{description}</span>
          <span className={styles.price}>Price: ${price}</span>
        </div>
        <div className={styles.cardButton}>
          <Button
            onClick={() => {
              dispatch(addItem(item));
            }}
            icon={<LuPlusSquare />}
            text="Add to cart"
          />
        </div>
      </div>
    </div>
  );
}
