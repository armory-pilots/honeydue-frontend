import { Fragment, useCallback, useEffect, useState } from "react";
import { Disclosure, Menu, Transition, Switch } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import axios from "axios";
import moment from "moment";


const navigation = ["Chores"];
const profile = ["Your Profile", "Settings", "Sign out"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function App() {

  const fetchChores = useCallback(async () => {
    const result = await axios.get("http://localhost:8080/api/v1/chores", {
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJob25leWR1ZSIsInN1YiI6ImplZGlrbmlnaHQiLCJuYW1lIjoibHVrZSBza3l3YWxrZXIiLCJzY29wZSI6InVzZXJzIiwiaWF0IjoxNjIxMjk1NjEyLCJleHAiOjE2MjEzMjQ0MTJ9.UE_ktLk8_hdI2DlNQrG-Xmmg2mmmOIZII8SUROo1HgQ",
      },
    });
    const backendChores = result.data
    setChores(backendChores);
  }, []);

  async function addChore() {
    const result = await axios.post(
      "http://localhost:8080/api/v1/chores",
      choreData,
      {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJob25leWR1ZSIsInN1YiI6ImplZGlrbmlnaHQiLCJuYW1lIjoibHVrZSBza3l3YWxrZXIiLCJzY29wZSI6InVzZXJzIiwiaWF0IjoxNjIxMjk1NjEyLCJleHAiOjE2MjEzMjQ0MTJ9.UE_ktLk8_hdI2DlNQrG-Xmmg2mmmOIZII8SUROo1HgQ",
        },
      }
    );
    console.log(result.data)
  }
  
  const initialChoreData = {
    title: "",
    description: "",
    completed: false,
    dueDate: moment().format("YYYY-MM-DD").toString(),
  };

  const [enabled, setEnabled] = useState(false);
  const [chores, setChores] = useState([]);
  const [choreData, updateChoreData] = useState(initialChoreData);

  const handleChange = (e) => {
    updateChoreData({
      ...choreData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormReset = (e) => {
    updateChoreData(initialChoreData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(choreData);
    addChore();
    updateChoreData(initialChoreData);
  };

  useEffect(() => {
    fetchChores()
  }, [chores, fetchChores])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-indigo-600 pb-32">
        <Disclosure
          as="nav"
          className="bg-indigo-600 border-b border-indigo-300 border-opacity-25 lg:border-none"
        >
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
                  <div className="px-2 flex items-center lg:px-0">
                    <div className="flex-shrink-0">
                      <img
                        className="block h-8 w-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden lg:block lg:ml-10">
                      <div className="flex space-x-4">
                        {navigation.map((item, itemIdx) =>
                          itemIdx === 0 ? (
                            <Fragment key={item}>
                              {/* Current: "bg-indigo-700 text-white", Default: "text-white hover:bg-indigo-500 hover:bg-opacity-75" */}
                              <a
                                href="#"
                                className="bg-indigo-700 text-white rounded-md py-2 px-3 text-sm font-medium"
                              >
                                {item}
                              </a>
                            </Fragment>
                          ) : (
                            <a
                              key={item}
                              href="#"
                              className="text-white hover:bg-indigo-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium"
                            >
                              {item}
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex lg:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-indigo-600 p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="hidden lg:block lg:ml-4">
                    <div className="flex items-center">
                      <button className="bg-indigo-600 flex-shrink-0 rounded-full p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative flex-shrink-0">
                        {({ open }) => (
                          <>
                            <div>
                              <Menu.Button className="bg-indigo-600 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                <img
                                  className="rounded-full h-8 w-8"
                                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  alt=""
                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              show={open}
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items
                                static
                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                              >
                                {profile.map((item) => (
                                  <Menu.Item key={item}>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "block py-2 px-4 text-sm text-gray-700"
                                        )}
                                      >
                                        {item}
                                      </a>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </>
                        )}
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="lg:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map((item, itemIdx) =>
                    itemIdx === 0 ? (
                      <Fragment key={item}>
                        {/* Current: "bg-indigo-700 text-white", Default: "text-white hover:bg-indigo-500 hover:bg-opacity-75" */}
                        <a
                          href="#"
                          className="bg-indigo-700 text-white block rounded-md py-2 px-3 text-base font-medium"
                        >
                          {item}
                        </a>
                      </Fragment>
                    ) : (
                      <a
                        key={item}
                        href="#"
                        className="text-white hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium"
                      >
                        {item}
                      </a>
                    )
                  )}
                </div>
                <div className="pt-4 pb-3 border-t border-indigo-700">
                  <div className="px-5 flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="rounded-full h-10 w-10"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">
                        Tom Cook
                      </div>
                      <div className="text-sm font-medium text-indigo-300">
                        tom@example.com
                      </div>
                    </div>
                    <button className="ml-auto bg-indigo-600 flex-shrink-0 rounded-full p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {profile.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <header className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">
              HoneyDue Dashboard
            </h1>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="space-y-6">
              <div className="bg-white px-4 py-5 sm:rounded-lg sm:p-6">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Add a Chore
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Add a new chore to complete
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0 md:col-span-2">
                    <form className="space-y-3" onSubmit={handleSubmit} onReset={handleFormReset}>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Title
                          </label>
                          <div className="mt-0 flex rounded-md shadow-sm">
                            <input
                              type="text"
                              name="title"
                              id="title"
                              className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none sm:text-sm border-gray-300"
                              value={choreData.title}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <div className="mt-0">
                          <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 "
                            value={choreData.description}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                          <label
                            htmlFor="dueDate"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Due Date
                          </label>
                          <div className="mt-0 flex rounded-md shadow-sm">
                            <input
                              type="text"
                              name="dueDate"
                              id="dueDate"
                              className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none sm:text-sm border-gray-300"
                              value={choreData.dueDate}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Add Chore
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-lg font-medium text-gray-900">
                  +
                </span>
              </div>
            </div>
            <div className="bg-white sm:px-6">
              <div className="space-y-1">
                <div className="bg-white sm:p-6">
                  <div className="md:grid md:grid-cols-3">
                    <div className="md:col-span-1">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Chores on Deck
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Complete those HoneyDues to earn beer, wine, chocolate,
                        ice cream.
                      </p>
                    </div>
                    <div className="mt-1 md:mt-0 md:col-span-2">
                      <ul className="divide-y divide-gray-200">
                        {chores.map((chore) => (
                          <li key={chore.id} className="py-4">
                            <Switch.Group
                              as="div"
                              className="flex items-center justify-between"
                            >
                              <Switch.Label
                                as="span"
                                className="flex-grow flex flex-col"
                                passive
                              >
                                <span className="text-sm font-medium text-gray-900">
                                  {chore.title}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {chore.description}
                                </span>
                              </Switch.Label>
                              <Switch
                                checked={enabled}
                                onChange={setEnabled}
                                className={classNames(
                                  enabled ? "bg-indigo-600" : "bg-gray-200",
                                  "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                )}
                              >
                                <span className="sr-only">Use setting</span>
                                <span
                                  aria-hidden="true"
                                  className={classNames(
                                    enabled ? "translate-x-5" : "translate-x-0",
                                    "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                  )}
                                />
                              </Switch>
                            </Switch.Group>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}
