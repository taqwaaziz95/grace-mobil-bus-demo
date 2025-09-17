// utils/CartService.ts
export interface CatalogItem {
    id: number;
    name: string;
    price: number;
    duration: string;
    carType: string;
    amenities: string;
    rating: string;
    fuelType: string;
    location: string;
    image: string;
    type: string;
    seats: number;
    isSupir: boolean;
}

export interface CartItem extends CatalogItem {
    quantity: number;
    customRequest?: {
        jenis: string;
        transmisi: string;
        warna: string;
        durasi: string;   // e.g., "12 Jam"
        dari: string;     // e.g., "2025-08-05"
        sampai: string;   // e.g., "2025-08-05"
        total: number;    // Rp10.000.000
    };
}
export class CartService {
    private static STORAGE_KEY = "rentDetails";

    /** ✅ Get all cart items */
    static getItems(): CartItem[] {
        if (typeof window === "undefined") return [];
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    /** ✅ Save to localStorage */
    private static save(items: CartItem[]) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    }

    /** ✅ Add to cart or increase quantity */
    static add(item: CatalogItem, qty: number = 1, customRequest?: CartItem["customRequest"]) {
        const cart = this.getItems();

        if (cart.length > 0) {
            const existingType = cart[0].type;
            if (existingType !== item.type) {
                throw new Error(`You cannot mix "${existingType}" and "${item.type}" in the same cart.`);
            }
        }

        const existing = cart.find((i) => i.id === item.id);

        if (item.type === "rent") {
            if (existing) {
                throw new Error("This vehicle is already in the cart.");
            }
            cart.push({ ...item, quantity: 1, customRequest });
        } else {
            if (existing) {
                existing.quantity += qty;
            } else {
                cart.push({ ...item, quantity: qty });
            }
        }

        this.save(cart);
        return cart;
    }

    /** ✅ Remove item */
    static remove(id: number) {
        const cart = this.getItems().filter((i) => i.id !== id);
        this.save(cart);
        return cart;
    }

    /** ✅ Update quantity */
    static updateQuantity(id: number, qty: number) {
        const cart = this.getItems().map((i) =>
            i.id === id ? { ...i, quantity: qty } : i
        );
        this.save(cart);
        return cart;
    }

    /** ✅ Clear cart */
    static clear() {
        localStorage.removeItem(this.STORAGE_KEY);
    }

    /** ✅ Get total price */
    static getTotal() {
        return this.getItems().reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    }

    /** ✅ Get total items count */
    static getCount() {
        return this.getItems().reduce((sum, item) => sum + item.quantity, 0);
    }
}

export interface Ticket {
    id: string; // unique ticket ID
    car: CatalogItem;
    username: string;
    date: string;  // e.g., "2025-08-05"
    time: string;  // e.g., "07:00"
    seats: string[]; // ["1D", "1E"]
    totalPrice: number;
    createdAt: string; // timestamp
    category: string;
}

export class TicketService {
    private static STORAGE_KEY = "bookingDetails";

    /** ✅ Get all tickets */
    static getTickets(): Ticket[] {
        if (typeof window === "undefined") return [];
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    /** ✅ Save to localStorage */
    private static save(tickets: Ticket[]) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tickets));
    }

    /** ✅ Add a new ticket */
    static add(ticketData: Omit<Ticket, "id" | "totalPrice" | "createdAt">) {
        const tickets = this.getTickets();
        const totalPrice = ticketData.car.price * ticketData.seats.length;
        const newTicket: Ticket = {
            ...ticketData,
            id: `T-${Date.now()}`, // unique ID
            totalPrice,
            createdAt: new Date().toISOString(),
        };

        tickets.push(newTicket);
        this.save(tickets);
        return newTicket;
    }

    /** ✅ Remove ticket */
    static remove(ticketId: string) {
        const tickets = this.getTickets().filter((t) => t.id !== ticketId);
        this.save(tickets);
        return tickets;
    }

    /** ✅ Check if seats are already booked for a specific car/date/time */
    static isSeatBooked(carId: number, date: string, time: string, seat: string) {
        const tickets = this.getTickets();
        return tickets.some(
            (t) =>
                t.car.id === carId &&
                t.date === date &&
                t.time === time &&
                t.seats.includes(seat)
        );
    }
}