import React, { FC, Fragment, useEffect, useMemo, useState } from "react";
import debouce from "lodash.debounce";
import { Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import Client, { pexels } from "../client.ts";

const CoverSelector: FC<{
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  setCoverImage: (url: string) => void;
  client: Client;
}> = ({ open, setOpen, setCoverImage, client }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [response, setResponse] = useState<pexels.SearchResponse | undefined>(
    undefined
  );

  // Debounce the search so we don't make a request on every key stroke
  const debouncedResults = useMemo<
    (event: React.ChangeEvent<HTMLInputElement>) => void
  >(() => {
    return debouce((event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    }, 300);
  }, []);

  useEffect(() => {
    const search = async () => {
      setIsLoading(true);
      try {
        const response = await client.pexels.Search(searchQuery);
        setResponse(response);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    };
    if (searchQuery.length) search();
    else setResponse(undefined);
  }, [searchQuery]);

  useEffect(() => {
    if (open) {
      setSearchQuery("");
      setResponse(undefined);
    }
  }, [open]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Select cover photo
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            <X size={32} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="relative mb-5 w-full">
                        <input
                          type="text"
                          placeholder="nature"
                          className="h-10 w-full rounded-sm border border-black border-opacity-50 px-3"
                          onChange={debouncedResults}
                        />
                        <MagnifyingGlass
                          size={25}
                          className="absolute right-3 top-2 opacity-50"
                        />
                      </div>

                      {isLoading && (
                        <span className="block w-full text-center">
                          Loading...
                        </span>
                      )}
                      {response && !isLoading && (
                        <div className="grid grid-cols-2 gap-2">
                          {response.photos.map((photo) => (
                            <div
                              key={photo.id}
                              className="pb-3/4 relative h-24 w-full cursor-pointer overflow-hidden hover:opacity-70"
                              onClick={() => {
                                setOpen(false);
                                setCoverImage(photo.src.large2x);
                              }}
                            >
                              <img
                                src={photo.src.medium}
                                className="absolute inset-0 h-full w-full object-cover"
                                alt={photo.photographer}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CoverSelector;
