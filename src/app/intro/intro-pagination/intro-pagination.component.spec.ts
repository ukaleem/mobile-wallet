import { IonicModule } from "@ionic/angular";
import { createHostFactory, mockProvider, Spectator } from "@ngneat/spectator";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";

import { StorageProvider } from "@/services/storage/storage";

import { IntroService } from "../shared/intro.service";
import { IntroState } from "../shared/intro.state";
import { IntroStateModel } from "../shared/intro.type";
import { IntroPagination } from "./intro-pagination.component";

describe("Intro Pagination", () => {
	let spectator: Spectator<IntroPagination>;
	let store: Store;

	const defaultState: IntroStateModel = {
		activeIndex: 0,
		isFinished: false,
	};

	const createComponent = createHostFactory({
		component: IntroPagination,
		imports: [IonicModule.forRoot(), NgxsModule.forRoot([IntroState])],
		providers: [
			mockProvider(IntroService, {
				load: () => of(defaultState),
			}),
			mockProvider(StorageProvider, {
				get: () => of(defaultState),
			}),
		],
	});

	beforeEach(() => {
		spectator = createComponent(
			`<intro-pagination [paginationSize]="[0,1,2]"></intro-pagination>`,
		);
		store = spectator.get(Store);
	});

	it("should create pagination component", () => {
		expect(spectator.component).toBeTruthy();
	});

	it("should render pagination items based on the pagination size", () => {
		const paginationElement = spectator.element;
		const component = spectator.component;
		const paginationItems = paginationElement.querySelectorAll("span");

		expect(paginationItems.length).toEqual(component.paginationSize.length);
	});
});