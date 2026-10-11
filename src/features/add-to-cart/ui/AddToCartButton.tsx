import { Button } from "@/shared/ui/button"


export const AddToCartButton = () => {
    return (
        <Button variants={["outline", "add"]}>
            <span>
                Добавить
            </span>

            {/*<i>
                0
            </i>*/}
        </Button>
    )
}