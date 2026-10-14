import { NotFoundBlock } from "@/shared/ui/not-found-block"
import { Button } from "@/shared/ui/button"

export const NotFoundPage = () => {
    return (
        <NotFoundBlock
            description="Данная страница отсутствует на маркетплейсе"
            actions={<Button to="/">В каталог товаров</Button>}
        />
    )
}
