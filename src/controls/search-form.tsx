import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { formSchema } from "../utils";

interface NumericSelectProps {
  placeholder: string;
  items: number[],
  field: any;
}

const NumberSelect = (props: NumericSelectProps) => {
  const { placeholder, items, field } = props
  return <Select onValueChange={(value) => Number.isNaN(Number(value)) ? field.onChange(0) : field.onChange(Number(value))} defaultValue={String(0)}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value={String(0)} key="all">All</SelectItem>
        {items.map(i => (<SelectItem value={String(i)} key={i}>{i.toString()}</SelectItem>))}
      </SelectGroup>
    </SelectContent>
  </Select>
}

interface Props {
  onClickSearch: (values: z.infer<typeof formSchema>) => void;
}

export const SearchForm = (props: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver:  zodResolver(formSchema),
    defaultValues: {wordToSearch: "", wordFrequency: 0, syllableCount: 0, rhymingType: "consonant", isSeseo: false, isEqBV: true, isYeismo: true},
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    props.onClickSearch(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex col-span-3 mt-10">
          <FormField control={form.control} name={"wordToSearch"} render={({ field }) => (
            <FormItem className="mr-2 grow">
              <FormControl>
                <Input placeholder="Type a word" type="text" {...field} />
              </FormControl>
            </FormItem>
        )} />
        <Button type="submit" className="flex-none"><MagnifyingGlassIcon /></Button>
        </div>
        <div className="grid grid-cols-3 gap-x-5 gap-y-5">
        <FormField control={form.control} name={"rhymingType"} render={({ field }) => (
          <FormItem>
            <FormLabel>Rhyming type</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="consonant" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Consonant
                  </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="assonant" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Assonant
                    </FormLabel>
                  </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )} />
        <FormField control={form.control} name={"wordFrequency"} render={({ field }) => (
          <FormItem>
            <FormLabel>Frequency</FormLabel>
            <FormControl>
              <NumberSelect placeholder="Select a number" items={[1, 2, 3, 4, 5]} field={field}/>
            </FormControl>
          </FormItem>
        )} />
        <FormField control={form.control} name={"syllableCount"} render={({ field }) => (
          <FormItem>
            <FormLabel>No. of Syllables</FormLabel>
            <FormControl>
              <NumberSelect placeholder="Select a number" items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} field={field}/>
            </FormControl>
          </FormItem>
        )} />
                <FormField control={form.control} name={"isYeismo"} render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormLabel className="text-sm font-normal">Yeismo</FormLabel>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )} />
        <FormField control={form.control} name={"isEqBV"} render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormLabel className="text-sm font-normal">B equals V</FormLabel>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />            
            </FormControl>
          </FormItem>
        )} />
        <FormField control={form.control} name={"isSeseo"} render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormLabel className="text-sm font-normal">Seseo</FormLabel>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              /> 
            </FormControl>
          </FormItem>
        )} />
        </div>

      </form>
    </Form>
  )
}
