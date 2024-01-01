"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSearchPartner from "@/queries/user/useSearchPartner";
import { useDebouncedValue } from "@mantine/hooks";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

type SelectPartnerProps = {
  onValueSelected: (userId: string) => void;
};

export default function SelectPartner({ onValueSelected }: SelectPartnerProps) {
  const [searchValue, setSearchValue] = useState<{
    value: string;
    fromSelect: boolean;
  }>({ value: "", fromSelect: false });
  const [debouncedSearch] = useDebouncedValue(searchValue, 200);
  const [showUsers, setShowUsers] = useState(false);

  const { data: partnersData, isLoading } = useSearchPartner(
    debouncedSearch.value,
    debouncedSearch.value.length > 0 && !debouncedSearch.fromSelect,
  );

  useEffect(() => {
    if (debouncedSearch?.value.length > 0 && !debouncedSearch.fromSelect) {
      setShowUsers(true);
    }
  }, [debouncedSearch]);

  return (
    <div>
      <Input
        onChange={(event) => {
          setSearchValue({ value: event.target.value, fromSelect: false });
        }}
        value={searchValue.value}
        placeholder="Busca a tu partner"
      />
      {debouncedSearch && !partnersData && isLoading && (
        <div className="mt-1 flex w-full flex-col rounded-md border border-primary bg-popover transition ease-in-out">
          <ReloadIcon className="m-4 h-5 w-5 animate-spin text-primary" />
        </div>
      )}
      {!isLoading && partnersData && showUsers && (
        <div className="mt-1 flex w-full flex-col rounded-md border border-primary bg-popover transition ease-in-out">
          {partnersData.length === 0 && (
            <div className="m-1 ml-1 rounded-md border-primary p-1 hover:cursor-pointer hover:bg-muted">
              <p className="text-sm">
                no hay usuarios registrados on este nombre
              </p>
            </div>
          )}
          {partnersData.map((partner, idx) => {
            return (
              <div
                key={idx}
                className="m-1 ml-1 rounded-md border-primary p-1 hover:cursor-pointer hover:bg-muted"
              >
                <Button
                  type="button"
                  onClick={() => {
                    onValueSelected(partner.id);
                    setSearchValue({
                      fromSelect: true,
                      value: `${partner.first_name} ${partner.last_name}`,
                    });
                    setShowUsers(false);
                  }}
                  variant="ghost"
                  className="flex w-full justify-start gap-2 focus:bg-muted active:bg-muted"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={partner.image_url || undefined} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  {partner.first_name} {partner.last_name} {partner.phone}
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
